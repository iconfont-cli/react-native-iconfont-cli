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
  replaceComponentName, replaceImports, replaceNames, replaceNamesArray,
  replaceSingleIconContent,
  replaceSize,
  replaceSvgComponents, replaceToDependsComments, replaceToOneComments,
} from './replace';
import { whitespace } from './whitespace';
import { GENERATE_MODE } from './generateMode';

const DOM_MAP = {
  path: 'Path',
};

export const generateComponent = (data: XmlData) => {
  const config = getConfig();
  const svgComponents: Set<string> = new Set();
  const names: string[] = [];
  const imports: string[] = [];
  const saveDir = path.resolve(config.safe_dir);
  const extension = config.use_typescript ? '.tsx' : '.jsx';
  let cases: string = '';

  if (config.generate_mode === GENERATE_MODE.allInOne) {
    svgComponents.add('Svg');
  }

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
          currentSvgComponents.add('Path');

          if (config.generate_mode === GENERATE_MODE.allInOne) {
            svgComponents.add('Path');
          }
          break;
        default:
          // no default
      }
    }

    cases += `${whitespace(4)}case '${iconIdAfterTrim}':\n`;

    if (config.generate_mode === GENERATE_MODE.allInOne) {
      cases += `${whitespace(6)}return (${generateCase(item, 8)}${whitespace(6)});\n`;
      return;
    }

    imports.push(componentName);
    cases += `${whitespace(6)}return <${componentName} size={size} />;\n`;

    singleFile = getTemplate('SingleIcon' + extension);
    singleFile = replaceSize(singleFile, config.default_font_size);
    singleFile = replaceSvgComponents(singleFile, currentSvgComponents);
    singleFile = replaceComponentName(singleFile, componentName);
    singleFile = replaceSingleIconContent(singleFile, generateCase(item, 4));

    if (config.generate_mode === GENERATE_MODE.allInOne) {
      singleFile = replaceToDependsComments(singleFile);
    } else {
      singleFile = replaceToOneComments(singleFile);
    }

    fs.writeFileSync(path.join(saveDir, componentName + extension), singleFile);

    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });

  let iconFile =  getTemplate('Icon' + extension);

  iconFile = replaceSize(iconFile, config.default_font_size);
  iconFile = replaceCases(iconFile, cases);
  iconFile = replaceSvgComponents(iconFile, svgComponents);
  iconFile = replaceImports(iconFile, imports);

  if (config.use_typescript) {
    iconFile = replaceNames(iconFile, names);
  } else {
    iconFile = replaceNamesArray(iconFile, names);
  }

  if (config.generate_mode === GENERATE_MODE.allInOne) {
    iconFile = replaceToDependsComments(iconFile);
  } else {
    iconFile = replaceToOneComments(iconFile);
  }

  fs.writeFileSync(path.join(saveDir, 'Icon' + extension), iconFile);

  console.log(`\n${colors.green('√')} You will find all icons in dir: ${colors.green(config.safe_dir)}\n`);
};

const generateCase = (data: XmlData['svg']['symbol'][number], baseIdent: number) => {
  let template = `\n${whitespace(baseIdent)}<Svg viewBox="${data.$.viewBox}" width={size} height={size}>\n`;

  for (const domName of Object.keys(data)) {
    let realDomName = DOM_MAP[domName];

    if (!realDomName) {
      continue;
    }

    if (data[domName].$) {
      template += `${whitespace(baseIdent + 2)}<${realDomName} ${addAttribute(data[domName])} />\n`;
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        template += `${whitespace(baseIdent + 2)}<${realDomName} ${addAttribute(sub)} />\n`;
      });
    }
  }

  template += `${whitespace(baseIdent)}</Svg>\n`;

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
