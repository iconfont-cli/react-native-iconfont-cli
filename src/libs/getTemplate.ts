import fs from 'fs';
import path from 'path';

export const getTemplate = (fileName: string) => {
  return fs.readFileSync(path.join(__dirname, `../templates/${fileName}.template`)).toString();
};
