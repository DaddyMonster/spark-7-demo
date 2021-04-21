import {
  SidebarStatus,
  useShouldKickIn,
  useSidebar,
  useSideStore,
  useSideWorker,
} from '@hessed/hook/sidebar';
import React from 'react';
import styled from 'styled-components';
import { AppRoot } from '../layout-root';
import { LeftSidebarRoot } from './LeftSidebarRoot';

export interface SideContentProps {
  sideStatus: SidebarStatus;
  toggleSidebar: () => void;
  isMiniPage: boolean;
}

export interface LayoutWithSidebarProps<T, P> {
  TopNavComponent: React.ComponentType<T>;
  SidebarContent: React.ComponentType<P & SideContentProps>;
  sideContentProps?: P;
  topNavProps: T;
  topNavHeight: number;
  children: React.ReactNode;
}

export function LayoutWithSidebar<T, P>({
  SidebarContent,
  TopNavComponent,
  children,
  topNavHeight,
  topNavProps,
  sideContentProps,
}: LayoutWithSidebarProps<T, P>) {
  const { toggleSidebar, width, sideStatus, isMiniPage } = useSidebar();
  const { sideProperty } = useSideStore();
  useSideWorker();

  const fullCondition = useShouldKickIn(sideProperty.full);
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fullCondition) {
      toggleSidebar();
    }
  };

  return (
    <AppRoot>
      <TopNavComponent {...topNavProps} />
      <LeftSidebarRoot paddingTop={topNavHeight} width={width}>
        <SidebarContent
          {...sideContentProps}
          sideStatus={sideStatus}
          toggleSidebar={toggleSidebar}
          isMiniPage={isMiniPage}
        />
      </LeftSidebarRoot>
      <ContentWrapperRoot
        currentWidth={width}
        subtractHeight={topNavHeight}
        onClick={handleContentClick}
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
