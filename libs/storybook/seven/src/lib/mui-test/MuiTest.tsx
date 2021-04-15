import React from 'react';

import { Typography } from '@material-ui/core';

export interface StorybookSevenProps {
  color: string;
}

export function StorybookSeven({ color }: StorybookSevenProps) {
  return (
    <div>
      <Typography style={{ color }}>Welcome to storybook-seven!</Typography>
    </div>
  );
}

export default StorybookSeven;
