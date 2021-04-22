import { Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React from 'react';

interface FormErrorLabelProps {
  message: string;
  show: boolean;
}

export const FormErrorLabel = ({ message, show }: FormErrorLabelProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <Typography
        sx={{
          height: 20,
          color: red[500],
          fontSize: '0.6rem',
          visibility: show ? 'visible' : 'hidden',
        }}
      >
        {message ?? ' '}
      </Typography>
    </div>
  );
};
