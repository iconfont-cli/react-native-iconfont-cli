import colors from 'colors';
import { getConfig } from '../libs/getConfig';
import { fetchXml } from '../libs/fetchXml';
import { generateComponent } from '../libs/generateComponent';

export const createIcon = () => {
  const {
    symbol_url: url,
  } = getConfig();

  fetchXml(url).then((result) => {
    generateComponent(result);
  }).catch((e) => {
    console.error(colors.red(e.message || 'Unknown Error'));
    process.exit(1);
  });
};

