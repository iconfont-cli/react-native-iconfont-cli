/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

export { default as IconClassSvg } from './IconClassSvg';
export { default as IconInlineStyle } from './IconInlineStyle';
export { default as IconNormal } from './IconNormal';
export { default as IconStyle } from './IconStyle';

interface Props extends GProps, ViewProps {
  name: 'classSvg' | 'inlineStyle' | 'normal' | 'style';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
