import { Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React from 'react';
import styled from 'styled-components';
interface FormErrorLabelProps {
  message: string;
  show: boolean;
}

export const FormErrorLabel = ({ message, show }: FormErrorLabelProps) => {
  return (
    <Root>
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
    </Root>
  );
};

const Root = styled.div(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
}));
