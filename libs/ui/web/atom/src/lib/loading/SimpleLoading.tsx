import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

export interface SimpleLoadingProps {
  message?: string;
}

export const SimpleLoading = ({ message }: SimpleLoadingProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <CircularProgress />
      {message && <Typography fontSize="0.7rem">{message}</Typography>}
    </div>
  );
};
