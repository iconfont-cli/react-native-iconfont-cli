/* eslint-disable */

import React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <style type="text/css">
    <![CDATA[

        circle {
           stroke: #006600;
           fill:   #00cc00;
        }

      ]]>
  </style>
  <circle cx="40" cy="40" r="24"/>
</svg>
`

const IconInlineStyle = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

IconInlineStyle.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconInlineStyle) : IconInlineStyle;
