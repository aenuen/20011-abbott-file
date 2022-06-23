import fs from 'fs'

/**
 * @description 删除文件
 * @param {string} fFile 文件路径
 * @returns {Promise<Boolean>}
 */
export const deleteFile = (fFile: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (fFile) {
      if (fs.existsSync(fFile)) {
        fs.unlink(fFile, (err) => {
          err ? reject(false) : resolve(true)
        })
      } else {
        resolve(true)
      }
    }
  })
}
