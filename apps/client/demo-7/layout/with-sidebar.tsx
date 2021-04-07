import React from 'react';
import { TOP_NAV_HEIGHT } from '../constants/layout-sizes';
import { AppRoot } from './index-page-base';
import { LeftSidebarRoot, useLeftSideStore } from './left-side-bar';
import styled from 'styled-components';
import { TopNav } from '../components/navs/top-nav/TopNav';
interface Props {
  SidebarContent: React.ComponentType;
  children: React.ReactNode;
}

export const LayoutWithSidebar = ({ SidebarContent, children }: Props) => {
  const [{ width }] = useLeftSideStore();
  return (
    <AppRoot>
      <TopNav />
      <LeftSidebarRoot paddingTop={TOP_NAV_HEIGHT}>
        <SidebarContent />
      </LeftSidebarRoot>
      <ContentWrapperRoot currentWidth={width} subtractHeight={TOP_NAV_HEIGHT}>
        {children}
      </ContentWrapperRoot>
    </AppRoot>
  );
};

const ContentWrapperRoot = styled.div<{
  currentWidth: number;
  subtractHeight: number;
}>(({ currentWidth, subtractHeight }) => ({
  paddingLeft: currentWidth,
  width: '100%',
  paddingTop: subtractHeight,
  flex: '1 0 auto',
  transition: 'all 300ms ease',
}));
