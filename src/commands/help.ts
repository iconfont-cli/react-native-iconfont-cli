import colors from 'colors';

export const renderHelp = () => {
  console.log([
    '',
    'Usage:',
    '',
    '    ' + colors.yellow('iconfont init') + '       : generate config file',
    '    ' + colors.yellow('iconfont') + '            : generate icon components',
    '',
  ].join('\n'));
};
