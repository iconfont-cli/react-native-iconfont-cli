import fs from 'fs';
import path from 'path';

export const copyTemplate = (fromFile: string, toFile: string) => {
  return fs.copyFileSync(
    path.join(__dirname, `../templates/${fromFile}.template`),
    toFile,
  );
};
