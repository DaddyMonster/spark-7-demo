/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTemplate } from '@hessed/storybook/seven';
import { Button, Typography } from '@material-ui/core';
import { Story } from '@storybook/react';
import React from 'react';
import { VerticalLgCardProps, VerticalLgCard } from './VerticalLgCard';
export default {
  title: 'List/VerticalLgCard',
  component: VerticalLgCard,
  argTypes: {
    bg: { control: 'color' },
  },
  decorators: [
    (Story: Story) => (
      <div style={{ width: 300, height: 'auto', display: 'flex' }}>
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
};

export const Sample1 = createTemplate<VerticalLgCardProps>(
  VerticalLgCard as never,
  {
    $rootStyle: {
      marginRight: 4,
      minWidth: 240,
    },
    displayName: 'Daniel Hwang',
    id: 'some-uid',
    photoURL: 'https://material-ui.com/static/images/avatar/3.jpg',
    subDisplayName: 'engineer',
    children: (
      <>
        <div className="flex w-full my-3 p-1 justify-around  items-center">
          <div className="mr-2">
            <Typography
              fontSize="0.7rem"
              textAlign="center"
              className="text-gray-600 mr-2"
            >
              Title
            </Typography>
            <Typography fontSize="1.2" textAlign="center">
              10
            </Typography>
          </div>
          <div className="mr-2">
            <Typography
              fontSize="0.7rem"
              textAlign="center"
              className="text-gray-600 mr-2"
            >
              Title
            </Typography>
            <Typography fontSize="1.2" textAlign="center">
              10
            </Typography>
          </div>
          <div className="mr-2">
            <Typography
              fontSize="0.7rem"
              textAlign="center"
              className="text-gray-600 mr-2"
            >
              Title
            </Typography>
            <Typography fontSize="1.2" textAlign="center">
              10
            </Typography>
          </div>
        </div>
        <div className="mx-auto flex">
          <Button variant="contained" sx={{ mr: 1, px: 5 }}>
            Action1
          </Button>
        </div>
      </>
    ),
  }
);

export const Sample2 = createTemplate<VerticalLgCardProps>(
  VerticalLgCard as never,
  {
    displayName: 'Daniel Hwang',
    id: 'some-uid',
    photoURL: 'https://material-ui.com/static/images/avatar/3.jpg',
    subDisplayName: 'Teacher',
    children: (
      <div className="flex m-3 p-3 justify-around items-center">
        <div className="mr-2">
          <Typography fontSize="0.7rem" className="text-gray-600 mr-2">
            Some Title
          </Typography>
          <Typography fontSize="1.2" textAlign="center">
            10
          </Typography>
        </div>
        <div className="mr-2">
          <Typography fontSize="0.7rem" className="text-gray-600 mr-2">
            Some Title
          </Typography>
          <Typography fontSize="1.2" textAlign="center">
            10
          </Typography>
        </div>
        <div className="mr-2">
          <Typography fontSize="0.7rem" className="text-gray-600 mr-2">
            Some Title
          </Typography>
          <Typography fontSize="1.2" textAlign="center">
            10
          </Typography>
        </div>
      </div>
    ),
  }
);
