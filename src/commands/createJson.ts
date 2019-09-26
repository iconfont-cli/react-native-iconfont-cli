#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import colors from 'colors';

const targetFile = path.resolve('iconfont.json');

if (fs.existsSync(targetFile)) {
  console.error(colors.red('File "iconfont.json" was created before.'));
} else {
  fs.copyFileSync(path.join(__dirname, '../libs/iconfont.json'), targetFile);
  console.log(colors.green('File "iconfont.json" is created now. We recommend you add it to version control.'));
}
