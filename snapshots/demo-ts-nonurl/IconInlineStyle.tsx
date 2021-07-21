/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgCss } from 'react-native-svg';
import { getIconColor } from './helper';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconInlineStyle: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <style type="text/css">
    <![CDATA[

        circle {
           stroke: #006600;
           fill: ${getIconColor(color, 0, '#333333')}
`

  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

IconInlineStyle.defaultProps = {
  size: 20,
};

IconInlineStyle = React.memo ? React.memo(IconInlineStyle) : IconInlineStyle;

export default IconInlineStyle;
