/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTemplate } from '@hessed/storybook/seven';
import { Story } from '@storybook/react';
import React from 'react';
import { UserListCardCustom, UserListCardCustomProps } from './UserListCardCustom';
export default {
  title: 'List/User-Profile-Card-Custom',
  component: UserListCardCustom,
  argTypes: {
    bg: { control: 'color' },
  },
  decorators: [
    (Story: Story) => (
      <div style={{ width: 300, height: 800 }}>
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
};

export const Sample1 = createTemplate<UserListCardCustomProps>(
  UserListCardCustom as never,
  {
    displayName: 'Daniel Hwang',
    onClick: () => console.log('Hello'),
    uid: 'some-uid',
    photoURL: 'https://material-ui.com/static/images/avatar/3.jpg',
    active: true,
  }
);
