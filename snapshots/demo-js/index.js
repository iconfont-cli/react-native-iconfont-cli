/* eslint-disable */

import React from 'react';

import IconAlipay from './IconAlipay';
import IconUser from './IconUser';
import IconSetup from './IconSetup';
import IconClassSvg from './IconClassSvg';
import IconInlineStyle from './IconInlineStyle';
import IconNormal from './IconNormal';
import IconStyle from './IconStyle';
export { default as IconAlipay } from './IconAlipay';
export { default as IconUser } from './IconUser';
export { default as IconSetup } from './IconSetup';
export { default as IconClassSvg } from './IconClassSvg';
export { default as IconInlineStyle } from './IconInlineStyle';
export { default as IconNormal } from './IconNormal';
export { default as IconStyle } from './IconStyle';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'alipay':
      return <IconAlipay key="1" {...rest} />;
    case 'user':
      return <IconUser key="2" {...rest} />;
    case 'setup':
      return <IconSetup key="3" {...rest} />;
    case 'classSvg':
      return <IconClassSvg key="L1" {...rest} />;
    case 'inlineStyle':
      return <IconInlineStyle key="L2" {...rest} />;
    case 'normal':
      return <IconNormal key="L3" {...rest} />;
    case 'style':
      return <IconStyle key="L4" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
