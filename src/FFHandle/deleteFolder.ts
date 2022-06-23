import fs from 'fs'

/**
 * @description 删除文件夹
 * @param {string} fFolder 文件夹路径
 * @returns {Promise<Boolean>}
 */
export const deleteFolder = (fFolder: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(fFolder)) {
      fs.rmdir(fFolder, {recursive: true}, (err) => {
          err ? reject(false) : resolve(true)
        }
      )
    } else {
      resolve(true)
    }
  })
}
