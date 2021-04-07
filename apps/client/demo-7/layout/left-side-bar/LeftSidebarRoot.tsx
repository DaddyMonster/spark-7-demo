import React from 'react';
import styled from 'styled-components';
import { SidebarSizeMap, useLeftSideStore } from './useLeftSideStore';

export interface LeftSidebarRootProps {
  children: React.ReactNode;
  sidebarSizeMap?: SidebarSizeMap;
  paddingTop: number;
}

export const LeftSidebarRoot = ({
  children,
  sidebarSizeMap,
  paddingTop,
}: LeftSidebarRootProps) => {
  const [{ width }] = useLeftSideStore(sidebarSizeMap);

  return (
    <Root width={width} paddingTop={paddingTop}>
      {children}
    </Root>
  );
};

const Root = styled.div<{ width: number; paddingTop: number }>(
  ({ width, paddingTop }) => ({
    height: '100vh',
    position: 'fixed',
    width,
    paddingTop,
    transition: 'all 300ms ease',
  })
);
