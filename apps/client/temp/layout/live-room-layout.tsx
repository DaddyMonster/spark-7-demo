import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';

import { SideRenderer } from '../components/side-renderer/SideRenderer';
import { TOP_NAV_HEIGHT } from '../constants/layout-sizes';
import { SevenItems } from '../constants/sidebar-items';
import {
  LeftSidebarSizeEnum,
  useLeftSideStore,
} from '../layout/left-side-bar/useLeftSideStore';
import { LayoutWithSidebar } from '../layout/with-sidebar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LiveRoomLayout = ({ children }: any) => {
  const [{ width }, setSize] = useLeftSideStore();
  useEffect(() => {
    setSize(LeftSidebarSizeEnum.Mini);
    return () => setSize(LeftSidebarSizeEnum.Normal);
  }, []);

  const handleSidebar = (bool: boolean) => {
    setSize(bool ? LeftSidebarSizeEnum.Normal : LeftSidebarSizeEnum.Mini);
  };

  return (
    <LayoutWithSidebar
      varingNav
      SidebarContent={() => (
        <SideRenderer navItems={SevenItems} handleSidebar={handleSidebar} />
      )}
    >
      {children}
    </LayoutWithSidebar>
  );
};

export default LiveRoomLayout;
