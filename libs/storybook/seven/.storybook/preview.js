import { ClientTypes, SparkThemeProvider } from '@hessed/styles/theme';
import '../../../../global/css/fonts.css';
import '../../../../global/tailwind/seven/tailwindcss-seven.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { withPerformance } from 'storybook-addon-performance';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};
export const decorators = [
  withPerformance,
  (Story) => (
    <SparkThemeProvider clientType={ClientTypes.Seven}>
      <Story />
    </SparkThemeProvider>
  ),
];
