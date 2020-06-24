/* eslint-disable */

import React from 'react';

import IconAlipay from './IconAlipay';
import IconUser from './IconUser';
import IconSetup from './IconSetup';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'alipay':
      return <IconAlipay key="1" {...rest} />;
    case 'user':
      return <IconUser key="2" {...rest} />;
    case 'setup':
      return <IconSetup key="3" {...rest} />;
  }

  return null;
};

export default React.memo ? React.memo(IconFont) : IconFont;
