import fs from "fs";

/**
 * @description 是否文件
 * @param {String} fFile 文件路径
 * @returns {Promise<Boolean>}
 */
export const isFile = (fFile: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.stat(fFile, (err, stats) => {
      err ? reject(false) : stats.isFile() ? resolve(true) : reject(false);
    });
  });
};
