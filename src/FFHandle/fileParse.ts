import fs from "fs";

export class FileParse {
  // 定义变量
  private suffix!: string;
  private path!: string;
  private filePath!: string;
  private newFile!: string;
  private originalName!: string;

  // 预先处理
  constructor(aFile: any) {
    this.parseFile(aFile);
  }

  // 解析文件
  parseFile(file: Record<string | number | symbol, any>) {
    // noinspection SpellCheckingInspection
    const { destination: des, filename = "", originalname: originalName, path = "" } = file;
    const suffix = originalName.split(".")[1] || "";
    this.suffix = suffix;
    this.path = path;
    this.filePath = `${des}${filename}.${suffix}`;
    this.newFile = `${filename}.${suffix}`;
    this.originalName = originalName;
  }

  // 解析
  parse() {
    return new Promise(async (resolve, reject) => {
      if (this.suffix) {
        if (fs.existsSync(this.path) && !fs.existsSync(this.filePath)) {
          fs.renameSync(this.path, this.filePath);
        }
        resolve(this);
      } else {
        reject(new Error("上文件的后缀名无效"));
      }
    });
  }
}
