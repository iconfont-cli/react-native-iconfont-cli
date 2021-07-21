/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';
import { getIconColor } from './helper';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconNormal: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="24" stroke="#000000" fill=${getIconColor(color, 0, '#333333')}/>
</svg>
`

  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

IconNormal.defaultProps = {
  size: 20,
};

IconNormal = React.memo ? React.memo(IconNormal) : IconNormal;

export default IconNormal;
