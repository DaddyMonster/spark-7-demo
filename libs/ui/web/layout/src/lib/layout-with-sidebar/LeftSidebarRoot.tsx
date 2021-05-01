import React from 'react';
import styled from 'styled-components';

export interface LeftSidebarRootProps {
  children: React.ReactNode;
  paddingTop: number;
  width: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const LeftSidebarRoot = ({
  children,
  paddingTop,
  width,
  onMouseEnter,
  onMouseLeave,
}: LeftSidebarRootProps) => {
  return (
    <Root
      width={width}
      paddingTop={paddingTop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Root>
  );
};

const Root = styled.div<{ width: number; paddingTop: number }>(
  ({ width, paddingTop, theme }) => ({
    height: '100vh',
    position: 'fixed',
    width: width - 2,
    boxShadow: theme.shadows[3],
    paddingTop,
    transition: 'all 300ms ease',
    /* background: theme.palette.default.main, */
    zIndex: 800,
  })
);
