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

export const Icon_Custom_Name: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'alipay':
      return <IconAlipay {...rest} />;
    case 'user':
      return <IconUser {...rest} />;
    case 'setup':
      return <IconSetup {...rest} />;
  }

  return null;
};

Icon_Custom_Name.defaultProps = {
  size: 20,
};

export default Icon_Custom_Name;
