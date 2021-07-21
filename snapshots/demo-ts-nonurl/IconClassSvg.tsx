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

let IconClassSvg: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg xmlns="http://www.w3.org/2000/svg">
  <style type="text/css">
    <![CDATA[

        circle.myGreen {
           stroke: #006600;
           fill: ${getIconColor(color, 0, '#333333')}
`

  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

IconClassSvg.defaultProps = {
  size: 20,
};

IconClassSvg = React.memo ? React.memo(IconClassSvg) : IconClassSvg;

export default IconClassSvg;
