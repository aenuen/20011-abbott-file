import fs from 'fs';

/**
 * @description 将数据保存成文件
 * @param {*} fData 文件数据
 * @param {string} fFile 文件路径
 * @returns {Promise<String>}
 */
const dataToFile = (fData, fFile) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fFile, fData, (err) => {
            err ? reject('') : resolve(fFile);
        });
    });
};

/**
 * @description 删除文件
 * @param {string} fFile 文件路径
 * @returns {Promise<Boolean>}
 */
const deleteFile = (fFile) => {
    return new Promise((resolve, reject) => {
        if (fFile) {
            if (fs.existsSync(fFile)) {
                fs.unlink(fFile, (err) => {
                    err ? reject(false) : resolve(true);
                });
            }
            else {
                resolve(true);
            }
        }
    });
};

/**
 * @description 删除文件夹
 * @param {string} fFolder 文件夹路径
 * @returns {Promise<Boolean>}
 */
const deleteFolder = (fFolder) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(fFolder)) {
            fs.rmdir(fFolder, { recursive: true }, (err) => {
                err ? reject(false) : resolve(true);
            });
        }
        else {
            resolve(true);
        }
    });
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class FileParse {
    // 预先处理
    constructor(aFile) {
        this.parseFile(aFile);
    }
    // 解析文件
    parseFile(file) {
        // noinspection SpellCheckingInspection
        const { destination: des, filename = '', originalname: originalName, path = '' } = file;
        const suffix = originalName.split('.')[1] || '';
        this.suffix = suffix;
        this.path = path;
        this.filePath = `${des}${filename}.${suffix}`;
        this.newFile = `${filename}.${suffix}`;
        this.originalName = originalName;
    }
    // 解析
    parse() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (this.suffix) {
                if (fs.existsSync(this.path) && !fs.existsSync(this.filePath)) {
                    fs.renameSync(this.path, this.filePath);
                }
                resolve(this);
            }
            else {
                reject(new Error('上文件的后缀名无效'));
            }
        }));
    }
}

/**
 * @description 获取目录或文件的系统明细
 * @param {string} fOrFPath 文件（夹）路径
 * @returns {Promise<Record<string | number | symbol, any>>}
 */
const getStats = (fOrFPath) => {
    return new Promise((resolve, reject) => {
        fs.stat(fOrFPath, (err, stats) => {
            err ? reject({}) : resolve(stats);
        });
    });
};

/**
 * @description 文件或文件夹是否存在
 * @param fOrFPath 文件（夹）路径
 * @returns {Promise<Boolean>}
 */
const isExists = (fOrFPath) => {
    return new Promise((resolve, reject) => {
        const result = fs.existsSync(fOrFPath);
        result ? resolve(true) : reject(false);
    });
};

/**
 * @description 是否文件
 * @param {String} fFile 文件路径
 * @returns {Promise<Boolean>}
 */
const isFile = (fFile) => {
    return new Promise((resolve, reject) => {
        fs.stat(fFile, (err, stats) => {
            err ? reject(false) : stats.isFile() ? resolve(true) : reject(false);
        });
    });
};

/**
 * @description 是否文件夹
 * @param {String} fFolder 文件夹路径
 * @return {Promise<Boolean>}
 */
const isFolder = (fFolder) => {
    return new Promise((resolve, reject) => {
        fs.stat(fFolder, (err, stats) => {
            err ? reject(false) : stats.isDirectory() ? resolve(true) : reject(false);
        });
    });
};

/**
 * @description 目录下所有的文件(不包含文件夹)
 * @param {string} folder 文件夹路径
 * @returns {Promise<Array>}
 */
const readDownFile = (folder) => {
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            err ? reject([]) : resolve(files);
        });
    });
};

/**
 * @description 重命名（移动）文件（夹）
 * @param {string} fOld 原文件（夹）路径
 * @param {string} fNew 新文件（夹）路径
 * @return {Promise<Boolean>}
 */
const rename = (fOld, fNew) => {
    return new Promise((resolve, reject) => {
        fs.rename(fOld, fNew, (err) => {
            err ? reject(false) : resolve(true);
        });
    });
};

export { FileParse, dataToFile, deleteFile, deleteFolder, getStats, isExists, isFile, isFolder, readDownFile, rename };
//# sourceMappingURL=import.js.map
