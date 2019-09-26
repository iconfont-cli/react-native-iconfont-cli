/* eslint-disable */

import React from 'react';

import IconAlipay from './IconAlipay';
import IconUser from './IconUser';
import IconSetup from './IconSetup';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
const IconFont = ({ color, name, size, ...rest }) => {
  switch (name) {
    case 'alipay':
      return <IconAlipay size={size} color={color} {...rest} />;
    case 'user':
      return <IconUser size={size} color={color} {...rest} />;
    case 'setup':
      return <IconSetup size={size} color={color} {...rest} />;

  }

  return null;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
