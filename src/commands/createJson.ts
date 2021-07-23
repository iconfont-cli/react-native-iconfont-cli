#!/usr/bin/env node

import path from "path";
import fs from "fs";
import colors from "colors";

const targetFile = path.resolve("iconfont.json");

if (fs.existsSync(targetFile)) {
  console.error(colors.red("iconfont.json 文件已经存在"));
} else {
  fs.copyFileSync(path.join(__dirname, "../libs/iconfont.json"), targetFile);
  console.log(
    colors.green("iconfont.json 文件生成成功，建议你加入到版本控制中")
  );
}
