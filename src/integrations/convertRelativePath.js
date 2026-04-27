import { writeFileSync, readFileSync } from "fs";
import { sync as globSync } from 'glob';
import config from '../site-config.js';

const { build } = config;
const { root, html } = build;

const calcRelativePath = (filePath) => {
  const depth = filePath.split('/').length - root.split('/').length - 1;
  return depth > 0 ? '../'.repeat(depth) : './';
};

const convertRelativePath = () => {
  if (!html.relativePath) return;

  try {
    const files = globSync(`${root}/**/*.html`);

    files.forEach((file) => {
      let data = readFileSync(file, "utf8");
      const newPath = calcRelativePath(file);

      // href, src, action, content 属性を処理する
      data = data.replace(/(href|src|action|content)=["']\//g, `$1="${newPath}`);

      // srcset 属性は別途処理する
      data = data.replace(/srcset=["']([^"']+)["']/g, (match, srcset) => {
        const paths = srcset.split(',').map(path => {
          const [url, descriptor] = path.trim().split(' ');
          if (url.startsWith('/')) {
            const newUrl = `${newPath}${url.substring(1)}`;
            return descriptor ? `${newUrl} ${descriptor}` : newUrl;
          }
          return path;
        });
        return `srcset="${paths.join(', ')}"`;
      });

      writeFileSync(file, data, "utf8");
    });
  } catch (error) {
    console.error(error);
  }
};

convertRelativePath();