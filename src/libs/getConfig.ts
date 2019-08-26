import path from 'path';
import fs from 'fs';
import colors from 'colors';
import defaultConfig from './iconfont.json';

let cacheConfig: typeof defaultConfig;

export const getConfig = () => {
  if (cacheConfig) {
    return cacheConfig;
  }

  const targetFile = path.resolve('iconfont.json');

  if (!fs.existsSync(targetFile)) {
    console.warn(colors.red('File "iconfont.json" doesn\'t exist, did you forget to generate it?'));
    process.exit(1);
  }

  const config = require(targetFile) as typeof defaultConfig;

  if (!config.symbol_url || !/^(https?:)?\/\//.test(config.symbol_url)) {
    console.warn(colors.red('You don\'t provide valid symbol url from iconfont.cn'));
    process.exit(1);
  }

  if (config.symbol_url.indexOf('//') === 0) {
    config.symbol_url = 'http:' + config.symbol_url;
  }

  config.safe_dir = config.safe_dir || defaultConfig.safe_dir;
  config.default_font_size = config.default_font_size || defaultConfig.default_font_size;

  cacheConfig = config;

  return config;
};
