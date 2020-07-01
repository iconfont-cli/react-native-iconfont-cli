/* eslint-disable */

import React from 'react';
import { GProps, SvgCss } from 'react-native-svg';


const IconClassSvg = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={`<svg xmlns="http://www.w3.org/2000/svg">
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
</svg>`}  width={size} height={size} {...rest} />
  );
};

IconClassSvg.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconClassSvg) : IconClassSvg;
