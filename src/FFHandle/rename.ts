import fs from 'fs'

/**
 * @description 重命名（移动）文件（夹）
 * @param {string} fOld 原文件（夹）路径
 * @param {string} fNew 新文件（夹）路径
 * @return {Promise<Boolean>}
 */
export const rename = (fOld: string, fNew: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.rename(fOld, fNew, (err) => {
      err ? reject(false) : resolve(true)
    })
  })
}
