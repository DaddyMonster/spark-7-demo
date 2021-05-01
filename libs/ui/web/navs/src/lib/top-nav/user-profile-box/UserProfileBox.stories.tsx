import { createTemplate } from '@hessed/storybook/seven';
import { UserProfileBox, UserProfileBoxProps } from './UserProfileBox';

export default {
  title: 'Nav/Top-nav/Route-box',
  component: UserProfileBox,
  argTypes: {
    bg: { control: 'color' },
  },
};

export const Show = createTemplate<UserProfileBoxProps>(
  UserProfileBox as never,
  {
    displayName: 'Daniel',
    navHeight: 50,
    onThumbClick: (elem) => console.log('HTML ELEM WILL BE GIVEN', elem),
    subDisplay: 'TRUSTED',
    photoURL: '',
  }
);

export const HiddenOnHome = createTemplate<UserProfileBoxProps>(
  UserProfileBox as never,
  {
    displayName: 'Clare',
    navHeight: 50,
    onThumbClick: (elem) => console.log('HTML ELEM WILL BE GIVEN', elem),
    subDisplay: 'TRUSTED',
    photoURL: 'https://material-ui.com/static/images/avatar/3.jpg',
  }
);
