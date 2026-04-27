import fs from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'
import sharp from 'sharp'
import chokidar from 'chokidar'
import config from '../site-config.js';

const { inputDir, outputDir, format, allowedExtensions, options } = config.images.optimize

const sharpOptions = {
  jpg: { format: 'jpg', options: options.jpg },
  png: { format: 'png', options: options.png },
  gif: { format: 'gif', options: options.gif },
  svg: { format: 'svg', options: options.svg },
  webp: { format: 'webp', options: options.webp },
}

/**
 * ファイルの拡張子を小文字で取得する関数
 * @param {string} filePath - ファイルパス
 */
const getExtname = (filePath) => path.extname(filePath).toLowerCase()

/**
 * formatに指定された拡張子に置換する関数
 * @param {string} filePath - ファイルパス
 */
const replaceImageExtension = (filePath) => filePath.replace(/\.(jpg|png)$/i, `.${format}`)

/**
 * ファイルパスを新しいディレクトリパスに置換する関数
 * @param {string} beforeDir - 元のディレクトリ
 * @param {string} afterDir - 新しいディレクトリ
 * @param {string} filePath - ファイルパス
 */
const replaceFilePath = (beforeDir, afterDir, filePath) => path.join(afterDir, path.relative(beforeDir, filePath))

/**
 * 画像を最適化し、formatに指定した拡張子に変換する関数
 * @param {string} srcPath - 元の画像パス
 * @param {string} destPath - 変換後の画像パス
 * @param {boolean} isFromSrc - inputDirからの変換かどうか
 */
const optimizeImage = async (srcPath, destPath, isFromInputDir) => {
  const extname = getExtname(srcPath)

  if (allowedExtensions.includes(extname)) {
    const inputFormat = extname === '.png' ? 'png' : 'jpg'
    const formatOptions = sharpOptions[inputFormat]
    const outputOptions = sharpOptions[format]
    const outputFilePath = path.join(outputDir, path.relative(outputDir, replaceImageExtension(destPath)))

    if (isFromInputDir) {
      try {
        await sharp(srcPath).toFormat(formatOptions.format, formatOptions.options).toFormat(outputOptions.format, formatOptions.options).toFile(outputFilePath)
        // console.log(`Converted to ${format}:`, destPath);
      } catch (err) {
        console.error(`Error converting to ${format}:`, err)
      }
    }
  } else {
    try {
      await fs.promises.copyFile(srcPath, destPath)
      // console.log('Copied image:', srcPath);
    } catch (err) {
      console.error('Error copying image:', err)
    }
  }
}

/**
 * 画像の変換を監視し、必要な処理を行う関数
 */
const watchImages = async () => {
  const srcWatcher = chokidar.watch(inputDir, {
    ignored: /(^|[/\\])\../,
    persistent: true,
  })

  srcWatcher.on('all', async (event, filePath) => {
    const isFromInputDir = true
    const targetFilePath = replaceFilePath(inputDir, outputDir, filePath)
    const outputFilePath = replaceImageExtension(targetFilePath)

    switch (event) {
      case 'add':
      case 'change':
        await optimizeImage(filePath, outputFilePath, isFromInputDir)
        break
      case 'addDir':
        fsExtra.ensureDirSync(outputFilePath)
        break
      case 'unlinkDir':
      case 'unlink':
        fsExtra.removeSync(outputFilePath)
        break
      default:
        break
    }
  })

  const publicWatcher = chokidar.watch(outputDir, {
    ignored: /(^|[/\\])\../,
    persistent: true,
  })

  publicWatcher.on('all', async (event, filePath) => {
    const extname = getExtname(filePath)

    if (event === 'unlink' && allowedExtensions.includes(extname)) {
      const removeFilePath = replaceImageExtension(filePath)
      if (!fs.existsSync(removeFilePath)) return
      await fs.promises.unlink(removeFilePath)
    }
  })
}

watchImages()
