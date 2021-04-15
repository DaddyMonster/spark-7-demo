import { GoogleButton, GoogleButtonProps } from './GoogleButton';
import { createTemplate } from '@hessed/storybook/seven';
export default {
  title: 'Atom/Button/Google-Login-Out',
  component: GoogleButton,
  argTypes: {
    bg: { control: 'color' },
  },
};

const baseProps = {
  onLogin: () => console.log('Loggin In'),
  onLogout: () => console.log('Loggin Out'),
};

export const First = createTemplate<GoogleButtonProps>(GoogleButton as never, {
  ...baseProps,
  isLogged: true,
});

export const Second = createTemplate<GoogleButtonProps>(GoogleButton as never, {
  ...baseProps,
  isLogged: false,
});
