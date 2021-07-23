export const replaceSize = (content: string, size: number) => {
  return content.replace(/#size#/g, String(size));
};

export const replacePx = (content: string, for_library: boolean) => {
  if (for_library) {
    return content.replace(
      /#px#/g,
      `import { px } from '../helpers/normalize';`
    );
  }
  return content.replace(
    /#px#/g,
    `
      import { helpers } from '@td-design/react-native';

      const { px } = helpers;
    `
  );
};

export const replaceCases = (content: string, cases: string) => {
  return content.replace(/#cases#/g, cases);
};

export const replaceSvgComponents = (
  content: string,
  components: Set<string>
) => {
  const used = Array.from(components);

  return content.replace(
    /#svgComponents#/g,
    used.length ? `import { ${used.join(", ")} } from 'react-native-svg';` : ""
  );
};

export const replaceNames = (content: string, names: string[]) => {
  return content.replace(/#names#/g, names.join(`' | '`));
};

export const replaceNamesArray = (content: string, names: string[]) => {
  return content.replace(
    /#namesArray#/g,
    JSON.stringify(names).replace(/"/g, "'").replace(/','/g, "', '")
  );
};

export const replaceComponentName = (content: string, name: string) => {
  return content.replace(/#componentName#/g, name);
};

export const replaceSingleIconContent = (content: string, render: string) => {
  return content.replace(/#iconContent#/g, render);
};

export const replaceImports = (content: string, imports: string[]) => {
  return content.replace(
    /#imports#/g,
    imports.map((item) => `import ${item} from './${item}';`).join("\n")
  );
};

export const replaceHelper = (content: string) => {
  return content.replace(
    /#helper#/g,
    "import { getIconColor } from './helper';"
  );
};

export const replaceNoColor = (content: string) => {
  return content.replace(/#colorFunc#/g, "");
};

export const replaceSummaryIcon = (content: string, iconName: string) => {
  return content.replace(/#SummaryIcon#/g, iconName);
};

export const replaceComponentXml = (content: string, svgStr: string) => {
  return content.replace(/#xml#/g, svgStr);
};

/**
 * 用helper中的getIconColor方法替换svg xml字符串的属性中的fill，实现颜色可配置的功能
 * @param xmlString
 */
export const replaceFillAttr = (xmlString: string) => {
  const replaceRegex = /fill\=\"([\d\w\#]*)\"/;
  const matchRegex = /fill\=\"([\d\w\#]*)\"/g;

  let xml = xmlString;

  const matches = xmlString.match(matchRegex)?.length ?? 0;
  new Array(matches).fill("").forEach((_, index) => {
    xml = xml.replace(
      replaceRegex,
      `fill="\${getIconColor(color, ${index}, '#333333')}"`
    );
  });
  return xml;
};

/**
 * 用helper中的getIconColor方法替换svg xml字符串的样式中的fill，实现颜色可配置的功能
 * @param xmlString
 */
export const replaceFillStyle = (xmlString: string) => {
  const replaceRegex = /fill:([\d\w\_\-\#\s\S]*)/;
  const matchRegex = /fill:([\d\w\_\-\#\s\S]*)/g;

  let xml = xmlString;

  const matches = xmlString.match(matchRegex)?.length ?? 0;
  new Array(matches).fill("").forEach((_, index) => {
    xml = xml.replace(
      replaceRegex,
      `fill: "\${getIconColor(color, ${index}, '#333333')}"`
    );
  });
  return xml;
};
