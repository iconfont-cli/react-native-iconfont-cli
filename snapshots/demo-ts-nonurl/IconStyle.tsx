/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgCss } from 'react-native-svg';
import { getIconColor } from './helper';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconStyle: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="24" style="stroke: #000000; fill: ${getIconColor(color, 0, '#333333')}
`

  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

IconStyle.defaultProps = {
  size: 20,
};

IconStyle = React.memo ? React.memo(IconStyle) : IconStyle;

export default IconStyle;
