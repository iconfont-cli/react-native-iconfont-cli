/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="24" stroke="#000000" fill="#00ff00"/>
</svg>
`

let IconNormal: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

IconNormal.defaultProps = {
  size: 20,
};

IconNormal = React.memo ? React.memo(IconNormal) : IconNormal;

export default IconNormal;
