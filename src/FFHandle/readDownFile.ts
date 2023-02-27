import fs from "fs";

/**
 * @description 目录下所有的文件(不包含文件夹)
 * @param {string} folder 文件夹路径
 * @returns {Promise<Array>}
 */
export const readDownFile = (folder: string): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      err ? reject([]) : resolve(files);
    });
  });
};
