import { Dialog } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export interface SmModalBaseProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const SmModalBase = ({ children, open, onClose }: SmModalBaseProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <Root>{children}</Root>
    </Dialog>
  );
};

const Root = styled.div(({ theme }) => ({
  width: 380,
}));
