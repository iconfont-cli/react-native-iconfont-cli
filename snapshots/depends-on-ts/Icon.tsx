/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconAlipay from './IconAlipay';
import IconUser from './IconUser';
import IconSetup from './IconSetup';

export type IconNames = 'alipay' | 'user' | 'setup';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
const Icon: FunctionComponent<Props> = ({ color, name, size, ...rest }) => {
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

Icon.defaultProps = {
  size: 20,
};

export default Icon;
