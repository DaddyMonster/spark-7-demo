/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createTemplate } from '@hessed/storybook/seven';
import { Story } from '@storybook/react';
import { UserListCard, UserListCardProps } from './UserListCard';
import { IconButton } from '@material-ui/core';
import { BsMic } from 'react-icons/bs';
export default {
  title: 'List/User-Profile-Card',
  component: UserListCard,
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

export const Sample1 = createTemplate<UserListCardProps>(
  UserListCard as never,
  {
    displayName: 'Daniel Hwang',
    onClick: () => console.log('Hello'),
    timeStampInfo: new Date(),
    uid: 'some-uid',
    userSubtitle: 'new user',
    PreAvatar: () => (
      <IconButton>
        <BsMic />
      </IconButton>
    ),
  }
);
