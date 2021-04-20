import { createTemplate } from '@hessed/storybook/seven';
import { LogoBox, LogoBoxProps } from './LogoBox';
export default {
  title: 'Nav/Top-nav/LogoBox',
  component: LogoBox,
  argTypes: {
    bg: { control: 'color' },
  },
};

export const WithToggle = createTemplate<LogoBoxProps>(LogoBox as never, {
  logoPath: 'http://dev.kiwiclass.me:4200/spark-7.svg',
  onLogoClick: () => console.log('Logo Clicked'),
  onSideToggle: () => console.log('Side toggle triggered'),
  showSideToggle: true,
});

export const WithoutToggle = createTemplate<LogoBoxProps>(LogoBox as never, {
  logoPath: 'http://dev.kiwiclass.me:4200/spark-7.svg',
  onLogoClick: () => console.log('Logo Clicked'),
  onSideToggle: () => console.log('Side toggle triggered'),
  showSideToggle: false,
});
