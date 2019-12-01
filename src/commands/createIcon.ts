#!/usr/bin/env node

import colors from 'colors';
import { getConfig } from '../libs/getConfig';
import { fetchXml } from 'iconfont-parser';
import { generateComponent } from '../libs/generateComponent';

const config = getConfig();

fetchXml(config.symbol_url).then((result) => {
  generateComponent(result, config);
}).catch((e) => {
  console.error(colors.red(e.message || 'Unknown Error'));
  process.exit(1);
});
