/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createTemplate } from '@hessed/storybook/seven';
import { SimpleTopNav, SimpleTopNavProps } from '../top-nav/SimpleTopNav';
import Spark7 from './spark-7.svg';
import { Story } from '@storybook/react';
export default {
  title: 'Nav/Top-nav/Seven-top-nav',
  component: SimpleTopNav,
  argTypes: {
    bg: { control: 'color' },
  },
  decorators: [
    (Story: Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
};

export const HomeTopNav = createTemplate<SimpleTopNavProps>(
  SimpleTopNav as never,
  {
    login: () => console.log('logging in'),
    logout: () => console.log('logging out'),
    logoPath: Spark7,
    router: {
      asPath: '/some-route',
      push: (path: string) => console.log(path),
    } as any,
    toggleSidebar: () => console.log('toggling'),
    user: { displayName: 'Daniel', reputation: 'new', photoURL: '' } as any,
    hideRoutes: true,
    transparental: true,
    __active_test__: false,
  }
);

export const AppTopNav = createTemplate<SimpleTopNavProps>(
  SimpleTopNav as never,
  {
    login: () => console.log('logging in'),
    logout: () => console.log('logging out'),
    logoPath: Spark7,
    router: {
      asPath: '/some-route',
      push: (path: string) => console.log(path),
    } as any,
    toggleSidebar: () => console.log('toggling'),
    user: { displayName: 'Daniel', reputation: 'new', photoURL: '' } as any,
    hideRoutes: false,
    transparental: false,
    __active_test__: true,
  }
);
