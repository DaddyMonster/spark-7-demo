import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  useShouldKickIn,
  useSidebar,
  useSideStore,
  useSideWorker,
} from '../../../../../../hook/sidebar/src';
import { SideContentProps } from '../../../../navs/src';
import { LeftSidebarRoot } from './LeftSidebarRoot';

export interface SidebarProps<P> {
  SidebarContent: React.ComponentType<P & SideContentProps>;
  sideContentProps?: P;
  topNavHeight: number;
  children: React.ReactNode;
  rootStyle: Record<string, unknown>;
}

export function Sidebar<P>({
  SidebarContent,
  sideContentProps,
  topNavHeight,
  children,
  rootStyle,
}: SidebarProps<P>) {
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
    <>
      <LeftSidebarRoot
        paddingTop={0}
        width={width}
        onMouseEnter={() => shouldTriggerHoverEvent && toggleSidebar()}
        onMouseLeave={() => shouldTriggerHoverEvent && toggleSidebar()}
      >
        <SidebarContent
          {...sideContentProps}
          sideStatus={sideStatus}
          topNavHeight={topNavHeight}
          rootStyle={rootStyle}
        />
      </LeftSidebarRoot>
      <ContentWrapperRoot
        currentWidth={width}
        subtractHeight={topNavHeight}
        onClick={handleContentClick}
      >
        {children}
      </ContentWrapperRoot>
    </>
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
