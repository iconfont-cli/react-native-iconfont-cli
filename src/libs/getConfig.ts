import path from 'path';
import fs from 'fs';
import colors from 'colors';
import defaultConfig from './iconfont.json';
import { GENERATE_MODE } from './generateMode';

export interface Config {
  symbol_url: string;
  use_typescript: boolean;
  save_dir: string;
  generate_mode: GENERATE_MODE;
  trim_icon_prefix: string;
  default_icon_size: number;
  summary_component_name: string;
}

let cacheConfig: Config;

export const getConfig = () => {
  if (cacheConfig) {
    return cacheConfig;
  }

  const targetFile = path.resolve('iconfont.json');

  if (!fs.existsSync(targetFile)) {
    console.warn(colors.red('File "iconfont.json" doesn\'t exist, did you forget to generate it?'));
    process.exit(1);
  }

  const config = require(targetFile) as Config;

  if (!config.symbol_url || !/^(https?:)?\/\//.test(config.symbol_url)) {
    console.warn(colors.red('You are required to provide symbol_url'));
    process.exit(1);
  }

  if (config.symbol_url.indexOf('//') === 0) {
    config.symbol_url = 'http:' + config.symbol_url;
  }

  config.save_dir = config.save_dir || defaultConfig.save_dir;
  config.default_icon_size = config.default_icon_size || defaultConfig.default_icon_size;
  config.summary_component_name = config.summary_component_name || defaultConfig.summary_component_name;

  if (!Object.values(GENERATE_MODE).includes(config.generate_mode)) {
    console.warn(colors.red(`Property generate_mode should be only one of ${JSON.stringify(Object.values(GENERATE_MODE))}`));
    process.exit(1);
  }

  cacheConfig = config;

  return config;
};
