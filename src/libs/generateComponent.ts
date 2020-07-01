import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';
import colors from 'colors';
import { camelCase, upperFirst } from 'lodash';
import { XmlData } from 'iconfont-parser';
import { Config } from './getConfig';
import { getTemplate } from './getTemplate';
import {
  replaceCases,
  replaceComponentName,
  replaceImports,
  replaceNames,
  replaceNamesArray,
  replaceSingleIconContent,
  replaceSize,
  replaceSvgComponents,
  replaceHelper, replaceNoHelper,
} from './replace'
import { whitespace } from './whitespace';
import { copyTemplate } from './copyTemplate';
import { ILocalSvg } from '../libs/parseLocalSvg';

const SVG_MAP = {
  path: 'Path',
};

const ATTRIBUTE_FILL_MAP = ['path'];

export const generateComponent = (data: XmlData, localSvg: ILocalSvg[], config: Config) => {
  const svgComponents: Set<string> = new Set();
  const names: string[] = [];
  const imports: string[] = [];
  const saveDir = path.resolve(config.save_dir);
  const jsxExtension = config.use_typescript ? '.tsx' : '.js';
  const jsExtension = config.use_typescript ? '.ts' : '.js';
  let cases: string = '';

  mkdirp.sync(saveDir);
  glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file));

  if (config.use_typescript) {
    svgComponents.add('GProps');
  }

  copyTemplate(`helper${jsExtension}`, path.join(saveDir, `helper${jsExtension}`));
  if (!config.use_typescript) {
    copyTemplate('helper.d.ts', path.join(saveDir, 'helper.d.ts'));
  }

  data.svg.symbol.forEach((item, index) => {
    let singleFile: string;
    const currentSvgComponents = new Set<string>(['Svg']);
    const iconId = item.$.id;
    const iconIdAfterTrim = config.trim_icon_prefix
      ? iconId.replace(
        new RegExp(`^${config.trim_icon_prefix}(.+?)$`),
        (_, value) => value.replace(/^[-_.=+#@!~*]+(.+?)$/, '$1')
      )
      : iconId;
    const componentName = upperFirst(camelCase(iconId));

    names.push(iconIdAfterTrim);

    if (config.use_typescript) {
      currentSvgComponents.add('GProps');
    }

    for (const domName of Object.keys(item)) {
      switch (domName) {
        case 'path':
          currentSvgComponents.add('Path');
          break;
        default:
          // no default
      }
    }

    cases += `${whitespace(4)}case '${iconIdAfterTrim}':\n`;

    imports.push(componentName);
    cases += `${whitespace(6)}return <${componentName} key="${index + 1}" {...rest} />;\n`;

    singleFile = getTemplate('SingleIcon' + jsxExtension);
    singleFile = replaceSize(singleFile, config.default_icon_size);
    singleFile = replaceSvgComponents(singleFile, currentSvgComponents);
    singleFile = replaceComponentName(singleFile, componentName);
    singleFile = replaceSingleIconContent(singleFile, generateCase(item, 4));
    singleFile = replaceHelper(singleFile);

    fs.writeFileSync(path.join(saveDir, componentName + jsxExtension), singleFile);

    if (!config.use_typescript) {
      let typeDefinitionFile = getTemplate('SingleIcon.d.ts');

      typeDefinitionFile = replaceComponentName(typeDefinitionFile, componentName);
      fs.writeFileSync(path.join(saveDir, componentName + '.d.ts'), typeDefinitionFile);
    }

    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });

  /**
   * 本地文件添加
   */
  localSvg.forEach(({ name, svgStr, styleType }, index) => {
    let singleFile: string;

    const componentName = upperFirst(config.trim_icon_prefix) + upperFirst(camelCase(name));
    const currentSvgComponents = new Set<string>(['GProps']);

    currentSvgComponents.add(styleType ? 'SvgCss' : 'SvgXml');

    names.push(name);

    cases += `${whitespace(4)}case '${name}':\n`;

    imports.push(componentName);

    cases += `${whitespace(6)}return <${componentName} key="L${index + 1}" {...rest} />;\n`;

    singleFile = getTemplate('SingleIcon' + jsxExtension);
    singleFile = replaceSize(singleFile, config.default_icon_size);
    singleFile = replaceSvgComponents(singleFile, currentSvgComponents);
    singleFile = replaceComponentName(singleFile, componentName);
    singleFile = replaceSingleIconContent(singleFile, `\n${whitespace(4)}<${styleType ? 'SvgCss' : 'SvgXml'} xml={\`${svgStr}\`}  width={size} height={size} {...rest} />\n`);
    singleFile = replaceNoHelper(singleFile);

    fs.writeFileSync(path.join(saveDir, componentName + jsxExtension), singleFile);

    if (!config.use_typescript) {
      let typeDefinitionFile = getTemplate('SingleIcon.d.ts');

      typeDefinitionFile = replaceComponentName(typeDefinitionFile, componentName);
      fs.writeFileSync(path.join(saveDir, componentName + '.d.ts'), typeDefinitionFile);
    }

    console.log(`${colors.green('√')} Generated local icon "${colors.yellow(name)}"`);
  })

  let iconFile =  getTemplate('Icon' + jsxExtension);

  iconFile = replaceSize(iconFile, config.default_icon_size);
  iconFile = replaceCases(iconFile, cases);
  iconFile = replaceSvgComponents(iconFile, svgComponents);
  iconFile = replaceImports(iconFile, imports);

  if (config.use_typescript) {
    iconFile = replaceNames(iconFile, names);
  } else {
    iconFile = replaceNamesArray(iconFile, names);

    let typeDefinitionFile = getTemplate('Icon.d.ts');

    typeDefinitionFile = replaceNames(typeDefinitionFile, names);
    fs.writeFileSync(path.join(saveDir, 'index.d.ts'), typeDefinitionFile);
  }

  fs.writeFileSync(path.join(saveDir, 'index' + jsxExtension), iconFile);

  console.log(`\n${colors.green('√')} All icons have putted into dir: ${colors.green(config.save_dir)}\n`);
}

const generateCase = (data: XmlData['svg']['symbol'][number], baseIdent: number) => {
  let template = `\n${whitespace(baseIdent)}<Svg viewBox="${data.$.viewBox}" width={size} height={size} {...rest}>\n`;

  for (const domName of Object.keys(data)) {
    let realDomName = SVG_MAP[domName];

    if (domName === '$') {
      continue;
    }

    if (!realDomName) {
      console.error(colors.red(`Unable to transform dom "${domName}"`));
      process.exit(1);
    }

    const counter = {
      colorIndex: 0,
      baseIdent,
    };

    if (data[domName].$) {
      template += `${whitespace(baseIdent + 2)}<${realDomName}${addAttribute(domName, data[domName], counter)}\n${whitespace(baseIdent + 2)}/>\n`;
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        template += `${whitespace(baseIdent + 2)}<${realDomName}${addAttribute(domName, sub, counter)}\n${whitespace(baseIdent + 2)}/>\n`;
      });
    }
  }

  template += `${whitespace(baseIdent)}</Svg>\n`;

  return template;
};

const addAttribute = (domName: string, sub: XmlData['svg']['symbol'][number]['path'][number], counter: { colorIndex: number, baseIdent: number }) => {
  let template = '';

  if (sub && sub.$) {
    if (ATTRIBUTE_FILL_MAP.includes(domName)) {
      // Set default color same as in iconfont.cn
      // And create placeholder to inject color by user's behavior
      sub.$.fill = sub.$.fill || '#333333';
    }

    for (const attributeName of Object.keys(sub.$)) {
      if (attributeName === 'fill') {
        template += `\n${whitespace(counter.baseIdent + 4)}${attributeName}={getIconColor(color, ${counter.colorIndex}, '${sub.$[attributeName]}')}`;
        counter.colorIndex += 1;
      } else {
        // convert attribute name to camel case, e.g fill-opacity to fillOpacity
        const reg = /-(\w)/g;
        const camelAttributeName = attributeName.replace(reg, (_a,b) =>  b.toUpperCase());
        template += `\n${whitespace(counter.baseIdent + 4)}${camelAttributeName}="${sub.$[attributeName]}"`;
      }
    }
  }

  return template;
};
