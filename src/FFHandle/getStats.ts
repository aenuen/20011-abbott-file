import fs from 'fs'

/**
 * @description 获取目录或文件的系统明细
 * @param {string} fOrFPath 文件（夹）路径
 * @returns {Promise<Record<string | number | symbol, any>>}
 */
export const getStats = (fOrFPath: string): Promise<Record<string | number | symbol, any>> => {
  return new Promise((resolve, reject) => {
    fs.stat(fOrFPath, (err, stats) => {
      err ? reject({}) : resolve(stats)
    })
  })
}
