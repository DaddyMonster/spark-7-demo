import React from 'react';
import styled from 'styled-components';
import {
  SidebarSizeMap,
  useLeftSideStore,
  LeftSidebarSizeEnum,
} from './useLeftSideStore';

export interface LeftSidebarRootProps {
  children: React.ReactNode;
  sidebarSizeMap?: SidebarSizeMap;
  paddingTop: number;
  width: number;
}

export const LeftSidebarRoot = ({
  children,
  sidebarSizeMap,
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
