/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconClassSvg from './IconClassSvg';
import IconInlineStyle from './IconInlineStyle';
import IconNormal from './IconNormal';
import IconStyle from './IconStyle';

export type IconNames = 'classSvg' | 'inlineStyle' | 'normal' | 'style';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
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
