import React, { useEffect, useMemo } from 'react';
import { TOP_NAV_HEIGHT } from '../constants/layout-sizes';
import { AppRoot } from './index-page-base';
import {
  LeftSidebarRoot,
  useLeftSideStore,
  LeftSidebarSizeEnum,
} from './left-side-bar';
import styled from 'styled-components';
import { TopNav } from '../components/navs/top-nav/TopNav';
import { useMediaQuery } from '@material-ui/core';
import { Theme } from '@material-ui/core';
interface Props {
  SidebarContent: React.ComponentType;
  children: React.ReactNode;
  varingNav?: boolean;
}

export const LayoutWithSidebar = ({
  SidebarContent,
  children,
  varingNav = false,
}: Props) => {
  const [{ width, size }, setSize] = useLeftSideStore();
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const sizeForUpMd = useMemo(
    () => (varingNav ? LeftSidebarSizeEnum.Mini : LeftSidebarSizeEnum.Normal),
    [varingNav]
  );
  useEffect(() => {
    setSize(downMd ? LeftSidebarSizeEnum.Hidden : sizeForUpMd);
  }, [downMd]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downMd && size === LeftSidebarSizeEnum.Normal) {
      setSize(LeftSidebarSizeEnum.Hidden);
    }
  };

  return (
    <AppRoot>
      <TopNav />
      <LeftSidebarRoot paddingTop={TOP_NAV_HEIGHT} width={width}>
        <SidebarContent />
      </LeftSidebarRoot>
      <ContentWrapperRoot
        currentWidth={width}
        subtractHeight={TOP_NAV_HEIGHT}
        onClick={handleContentClick}
      >
        {children}
      </ContentWrapperRoot>
    </AppRoot>
  );
};

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
