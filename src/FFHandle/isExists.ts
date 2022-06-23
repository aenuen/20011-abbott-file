import fs from "fs";

/**
 * @description 文件或文件夹是否存在
 * @param fOrFPath 文件（夹）路径
 * @returns {Promise<Boolean>}
 */
export const isExists = (fOrFPath: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const result = fs.existsSync(fOrFPath)
    result ? resolve(true) : reject(false)
  })
}
