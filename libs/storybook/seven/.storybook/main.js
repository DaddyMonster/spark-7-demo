const rootMain = require('../../../../.storybook/main');

rootMain.stories.push(
  ...[
    '../../../../libs/**/*.stories.mdx',
    '../../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
  ]
);

rootMain.typescript = {
  ...rootMain.typescript,
  check: false,
  checkOptions: {},
  reactDocgen: 'react-docgen-typescript',
  reactDocgenTypescriptOptions: {
    shouldRemoveUndefinedFromOptional: true,
    shouldExtractLiteralValuesFromEnum: true,
    propFilter: (prop) =>
      prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
  },
};

module.exports = rootMain;
