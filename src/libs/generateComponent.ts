import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';
import colors from 'colors';
import { camelCase, upperFirst } from 'lodash';
import { XmlData } from './fetchXml';
import { getConfig } from './getConfig';
import { getTemplate } from './getTemplate';
import {
  replaceCases,
  replaceComponentName, replaceNames, replaceNamesArray,
  replaceSingleIconContent,
  replaceSize,
  replaceSvgComponents,
} from './replace';

const DOM_MAP = {
  path: 'Path',
};

export const generateComponent = (data: XmlData) => {
  const config = getConfig();
  const svgComponents: Set<string> = new Set(['Svg']);
  const names: string[] = [];
  let cases: string = '';
  const saveDir = path.resolve(config.safe_dir);

  mkdirp.sync(saveDir);
  glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file));

  data.svg.symbol.forEach((item) => {
    let singleFile: string;
    const currentSvgComponents = new Set<string>(['Svg']);
    const iconId = item.$.id;
    const iconIdAfterTrim = config.trim_icon_prefix
      ? iconId.replace(new RegExp(`^${config.trim_icon_prefix}(.+?)$`), '$1')
      : iconId;
    const componentName = upperFirst(camelCase(iconId));

    names.push(iconIdAfterTrim);

    for (const domName of Object.keys(item)) {
      switch (domName) {
        case 'path':
          svgComponents.add('Path');
          currentSvgComponents.add('Path');
          break;
        default:
          // no default
      }
    }

    cases += `${' '.repeat(4)}case '${iconIdAfterTrim}':\n`;
    cases += `${' '.repeat(6)}return (${generateCase(item, 8)}${' '.repeat(6)});\n`;

    if (config.use_typescript) {
      singleFile = getTemplate('SingleIcon.tsx');
      singleFile = replaceSize(singleFile, config.default_font_size);
      singleFile = replaceSvgComponents(singleFile, currentSvgComponents);
      singleFile = replaceComponentName(singleFile, componentName);
      singleFile = replaceSingleIconContent(singleFile, generateCase(item, 4));

      fs.writeFileSync(path.join(saveDir, componentName + '.tsx'), singleFile);
    } else {
      singleFile = getTemplate('SingleIcon.jsx');
      singleFile = replaceSize(singleFile, config.default_font_size);
      singleFile = replaceSvgComponents(singleFile, currentSvgComponents);
      singleFile = replaceComponentName(singleFile, componentName);
      singleFile = replaceSingleIconContent(singleFile, generateCase(item, 4));

      fs.writeFileSync(path.join(saveDir, componentName + '.jsx'), singleFile);
    }

    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });

  let iconFile: string;

  if (config.use_typescript) {
    iconFile = getTemplate('Icon.tsx');
    iconFile = replaceSize(iconFile, config.default_font_size);
    iconFile = replaceCases(iconFile, cases);
    iconFile = replaceSvgComponents(iconFile, svgComponents);
    iconFile = replaceNames(iconFile, names);

    fs.writeFileSync(path.join(saveDir, 'Icon.tsx'), iconFile);
  } else {
    iconFile = getTemplate('Icon.jsx');
    iconFile = replaceSize(iconFile, config.default_font_size);
    iconFile = replaceCases(iconFile, cases);
    iconFile = replaceSvgComponents(iconFile, svgComponents);
    iconFile = replaceNames(iconFile, names);
    iconFile = replaceNamesArray(iconFile, names);

    fs.writeFileSync(path.join(saveDir, 'Icon.jsx'), iconFile);
  }

  console.log(`\n${colors.green('√')} You will find all icons in dir: ${colors.green(config.safe_dir)}\n`);
};

const generateCase = (data: XmlData['svg']['symbol'][number], baseIdent: number) => {
  let template = `\n${' '.repeat(baseIdent)}<Svg viewBox="${data.$.viewBox}" width={size} height={size}>\n`;

  for (const domName of Object.keys(data)) {
    let realDomName = DOM_MAP[domName];

    if (!realDomName) {
      continue;
    }

    if (data[domName].$) {
      template += `${' '.repeat(baseIdent + 2)}<${realDomName} ${addAttribute(data[domName])} />\n`;
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        template += `${' '.repeat(baseIdent + 2)}<${realDomName} ${addAttribute(sub)} />\n`;
      });
    }
  }

  template += `${' '.repeat(baseIdent)}</Svg>\n`;

  return template;
};

const addAttribute = (sub: XmlData['svg']['symbol'][number]['path'][number]) => {
  let template = '';

  if (sub && sub.$) {
    for (const attributeName of Object.keys(sub.$)) {
      template += ` ${attributeName}="${sub.$[attributeName]}"`;
    }
  }

  return template;
};
