/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createTemplate } from '@hessed/storybook/seven';
import { Story } from '@storybook/react';
import { UserListCard, UserListCardProps } from './UserListCard';

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
  }
);
