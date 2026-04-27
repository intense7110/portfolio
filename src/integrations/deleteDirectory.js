import fs from 'fs/promises'
import path from 'path'

const deleteDirectory = (targetDir, deleteDirs) => ({
  name: 'deleteDirectory',
  hooks: {
    'astro:build:generated': async () => {
      const root = process.cwd()
      const targetPath = path.join(root, targetDir)

      for (const deleteDir of deleteDirs) {
        const deletePath = path.join(targetPath, deleteDir)

        try {
          await fs.rm(deletePath, { recursive: true })
        } catch (error) {
          console.error(`Failed to delete ${deletePath}`)
        }
      }
    },
  },
})

export default deleteDirectory
