/* eslint-disable */

import React from 'react';

import IconWechat from './IconWechat';
import IconAlipay from './IconAlipay';
import IconBaidu from './IconBaidu';
import IconLogout from './IconLogout';
import IconUser from './IconUser';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
const Icon = ({ color, name, size, ...rest }) => {
  switch (name) {
    case 'wechat':
      return <IconWechat size={size} color={color} {...rest} />;
    case 'alipay':
      return <IconAlipay size={size} color={color} {...rest} />;
    case 'baidu':
      return <IconBaidu size={size} color={color} {...rest} />;
    case 'logout':
      return <IconLogout size={size} color={color} {...rest} />;
    case 'user':
      return <IconUser size={size} color={color} {...rest} />;

  }

  return null;
};

Icon.defaultProps = {
  size: 18,
};


export default Icon;
