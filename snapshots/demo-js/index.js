/* eslint-disable */

import React from 'react';

import IconAlipay from './IconAlipay';
import IconUser from './IconUser';
import IconSetup from './IconSetup';

const IconFont = ({ name, ...rest }) => {
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

export default React.memo ? React.memo(IconFont) : IconFont;
