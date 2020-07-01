/* eslint-disable */

import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="24" style="stroke: #000000; fill:#00ff00;"/>
</svg>
`

const IconStyle = ({ size, color, ...rest }) => {
  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

IconStyle.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconStyle) : IconStyle;
