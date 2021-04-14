import React from 'react';
import { Typography } from '@material-ui/core';
export interface SampleWelcomeProps {
  color: string;
  fontSize: number;
}

export const SampleWelcome = ({ color, fontSize }: SampleWelcomeProps) => {
  return (
    <div className="p-2">
      <Typography style={{ color }} fontSize={fontSize}>
        Welcome to Spark-7 Storybook
      </Typography>
    </div>
  );
};
