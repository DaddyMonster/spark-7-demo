/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import { TopNav } from '../components/navs/top-nav/TopNav';
import { useAuth } from '../hooks/auth';

export const IndexPageLayout = ({ children, ...props }: any) => {
  return (
    <AppRoot {...props}>
      <TopNav transparental />
      {children}
    </AppRoot>
  );
};

export const AppRoot = styled.div(({ theme }) => ({
  maxWidth: '100vw',
  overflow: 'hidden',
  width: '100vw',
  minHeight: '100vh',
  background: theme.palette.default.main,
}));
