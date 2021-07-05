export const replaceSize = (content: string, size: number) => {
  return content.replace(/#size#/g, String(size));
};

export const replaceCases = (content: string, cases: string) => {
  return content.replace(/#cases#/g, cases);
};

export const replaceSvgComponents = (content: string, components: Set<string>) => {
  const used = Array.from(components);

  return content.replace(
    /#svgComponents#/g,
    used.length
      ? `import { ${used.join(', ')} } from 'react-native-svg';`
      : ''
  );
};

export const replaceNames = (content: string, names: string[]) => {
  return content.replace(/#names#/g, names.join(`' | '`));
};

export const replaceNamesArray = (content: string, names: string[]) => {
  return content.replace(
    /#namesArray#/g,
    JSON.stringify(names)
      .replace(/"/g, '\'')
      .replace(/','/g, '\', \'')
  );
};

export const replaceComponentName = (content: string, name: string) => {
  return content.replace(/#componentName#/g, name);
};

export const replaceSingleIconContent = (content: string, render: string) => {
  return content.replace(/#iconContent#/g, render);
};

export const replaceImports = (content: string, imports: string[]) => {
  return content.replace(/#imports#/g, imports.map((item) => `export { default as ${item} } from './${item}';`).join('\n'));
};

export const replaceHelper = (content: string) => {
  return content.replace(
    /#helper#/g,
    'import { getIconColor } from \'./helper\';'
  );
};

export const replaceNoColor = (content: string) => {
  return content.replace(/#colorFunc#/g, '');
};

export const replaceSummaryIcon = (content: string, iconName: string) => {
  return content.replace(/#SummaryIcon#/g, iconName);
};

export const replaceComponentXml = (content: string, svgStr: string) => {
  return content.replace(/#xml#/g, svgStr);
}
