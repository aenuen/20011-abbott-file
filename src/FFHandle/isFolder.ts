import fs from "fs";

/**
 * @description 是否文件夹
 * @param {String} fFolder 文件夹路径
 * @return {Promise<Boolean>}
 */
export const isFolder = (fFolder: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.stat(fFolder, (err, stats) => {
      err ? reject(false) : stats.isDirectory() ? resolve(true) : reject(false);
    });
  });
};
