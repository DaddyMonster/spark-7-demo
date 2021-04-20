import { useSidebar } from '@hessed/hook/sidebar';
import React from 'react';
import styled from 'styled-components';
import { AppRoot } from '../layout-root';
import { LeftSidebarRoot } from './LeftSidebarRoot';

export interface LayoutWithSidebarProps<T> {
  TopNavComponent: React.ComponentType<T>;
  SidebarContent: React.ComponentType;
  topNavProps: T;
  topNavHeight: number;
  children: React.ReactNode;
}

export function LayoutWithSidebar<T>({
  SidebarContent,
  TopNavComponent,
  children,
  topNavHeight,
  topNavProps,
}: LayoutWithSidebarProps<T>) {
  const { toggleSidebar, width } = useSidebar();
  return (
    <AppRoot>
      <TopNavComponent {...topNavProps} />
      <LeftSidebarRoot paddingTop={topNavHeight} width={width}>
        <SidebarContent />
      </LeftSidebarRoot>
      <ContentWrapperRoot
        currentWidth={width}
        subtractHeight={topNavHeight}
        onClick={() => toggleSidebar(true)}
      >
        {children}
      </ContentWrapperRoot>
    </AppRoot>
  );
}

const ContentWrapperRoot = styled.div<{
  currentWidth: number;
  subtractHeight: number;
}>(({ currentWidth, subtractHeight, theme }) => ({
  paddingLeft: currentWidth,
  width: '100%',
  paddingTop: subtractHeight,
  flex: '1 0 auto',
  transition: 'all 300ms ease',
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
  },
}));
