/* eslint-disable */

import React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <style type="text/css">
    <![CDATA[

        circle.myGreen {
           stroke: #006600;
           fill:   #00cc00;
        }
       circle.myRed {
       stroke: #660000;
       fill:   #cc0000;
    }

      ]]>
  </style>

  <circle class="myGreen" cx="40" cy="40" r="24"/>
  <circle class="myRed" cx="40" cy="100" r="24"/>
</svg>
`

let IconClassSvg = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

IconClassSvg.defaultProps = {
  size: 18,
};

IconClassSvg = React.memo ? React.memo(IconClassSvg) : IconClassSvg;

export default IconClassSvg;
