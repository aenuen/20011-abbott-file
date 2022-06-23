import fs from 'fs'

/**
 * @description 将数据保存成文件
 * @param {*} fData 文件数据
 * @param {string} fFile 文件路径
 * @returns {Promise<String>}
 */
export const dataToFile = (fData: any, fFile: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fFile, fData, (err) => {
      err ? reject('') : resolve(fFile)
    })
  })
}
