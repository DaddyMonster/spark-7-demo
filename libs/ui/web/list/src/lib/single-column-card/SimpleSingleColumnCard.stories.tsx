/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createTemplate } from '@hessed/storybook/seven';
import { Story } from '@storybook/react';
import {
  SimpleSingleColumnCard,
  SimpleSingleColumnCardProps,
} from './SimpleSingleColumnCard';
import dy from 'dayjs';
import en from './sample-flag/en.svg';
import ko from './sample-flag/ko.svg';

export default {
  title: 'List/SingleColumn/Simple',
  component: SimpleSingleColumnCard,
  argTypes: {
    bg: { control: 'color' },
  },
  decorators: [
    (Story: Story) => (
      <div style={{ width: 1200, height: 800 }}>
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
};

export const Sample1 = createTemplate<SimpleSingleColumnCardProps>(
  SimpleSingleColumnCard as never,
  {
    imgUrl: 'http://dev.kiwiclass.me:4200/flags/ko.svg',
    mainLabel:
      'Excepteur minim laboris duis dolor excepteur proident. Velit anim id qui sunt anim cillum. Qui Lorem consectetur elit labore tempor esse laboris Lorem voluptate in velit cillum.',
    subLabel:
      'Mollit laborum duis reprehenderit consequat consequat anim proident qui nisi sunt eu laboris veniam.',
    dateDisplay: dy().subtract(2, 'hours').toDate(),
  }
);

export const Sample2 = createTemplate<SimpleSingleColumnCardProps>(
  SimpleSingleColumnCard as never,
  {
    imgUrl: 'http://dev.kiwiclass.me:4200/flags/us.svg',
    mainLabel:
      'Excepteur minim laboris duis dolor excepteur proident. Velit anim id qui sunt anim cillum. Qui Lorem consectetur elit labore tempor esse laboris Lorem voluptate in velit cillum.',
    subLabel:
      'Mollit laborum duis reprehenderit consequat consequat anim proident qui nisi sunt eu laboris veniam.',
    dateDisplay: dy().subtract(2, 'hours').toDate(),
  }
);
