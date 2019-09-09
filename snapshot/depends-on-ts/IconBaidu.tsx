/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
const IconBaidu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M555.9 242h30.4v189h-30.4V242z m-118.1 0h30.4v189h-30.4V242z m91.1 189h-30.4V242h30.4v189zM782 515.4c0 138.4-97.9 239.6-226.1 263.3V566c33.8-13.5 60.8-50.6 60.8-91.1V242H782v273.4zM244.9 242h165.4v232.9c0 40.5 27 77.6 60.8 91.1v212.6C342.8 755 244.9 653.8 244.9 515.4V242zM922 742V282c0-99-81-180-180-180H282c-99 0-180 81-180 180v460c0 99 81 180 180 180h460c99 0 180-81 180-180z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBaidu.defaultProps = {
  size: 20,
};

export default IconBaidu;
