import React from 'react';
import styled from 'styled-components';

export interface LeftSidebarRootProps {
  children: React.ReactNode;
  paddingTop: number;
  width: number;
}

export const LeftSidebarRoot = ({
  children,
  paddingTop,
  width,
}: LeftSidebarRootProps) => {
  return (
    <Root width={width} paddingTop={paddingTop}>
      {children}
    </Root>
  );
};

const Root = styled.div<{ width: number; paddingTop: number }>(
  ({ width, paddingTop, theme }) => ({
    height: '100vh',
    position: 'fixed',
    width,
    paddingTop,
    transition: 'all 300ms ease',
    background: theme.palette.default.main,
    zIndex: 800,
  })
);
