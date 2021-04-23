import {
  useShouldKickIn,
  useSidebar,
  useSideStore,
  useSideWorker,
} from '@hessed/hook/sidebar';
import { SideContentProps } from '@hessed/ui/web/navs';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AppRoot } from '../layout-root';
import { LeftSidebarRoot } from './LeftSidebarRoot';

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
    e.preventDefault();
    if (!fullCondition && sideStatus === 'full') {
      toggleSidebar();
    }
  };

  const shouldTriggerHoverEvent = useMemo(() => isMiniPage && fullCondition, [
    isMiniPage,
    fullCondition,
  ]);
  console.log('isMiniPage', isMiniPage);
  console.log('ShouldTriggerHoverEvent', shouldTriggerHoverEvent);
  console.log('FullCondition', fullCondition);

  return (
    <AppRoot>
      <TopNavComponent {...topNavProps} />
      <LeftSidebarRoot
        paddingTop={topNavHeight}
        width={width}
        onMouseEnter={() => shouldTriggerHoverEvent && toggleSidebar()}
        onMouseLeave={() => shouldTriggerHoverEvent && toggleSidebar()}
      >
        <SidebarContent {...sideContentProps} sideStatus={sideStatus} />
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
  minHeight: `calc(100vh - ${subtractHeight}px)`,
  paddingTop: subtractHeight,
  flex: '1 0 auto',
  transition: 'all 300ms ease',
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
  },
}));
