/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from 'react';
import { SidebarStatus } from './sidebar-preset';
import { useSideStore } from './useSideStore';
import { useShouldKickIn } from './useSideWorker';

export interface UseSidebarReturn {
  sideStatus: SidebarStatus;
  toggleSidebar: () => void;
  width: number;
  isMiniPage: boolean;
}

export function useSidebar(): UseSidebarReturn {
  const {
    setSideStatus,
    sideStatus,
    sideProperty,
    miniPage,
    forceMiniOnHide,
  } = useSideStore();

  const miniSideConditionForToggle = useShouldKickIn(
    sideProperty.mini,
    miniPage
  );

  const currentProperty = useMemo(() => sideProperty[sideStatus], [
    sideStatus,
    sideProperty,
  ]);

  const isMiniNow = useMemo(
    () => forceMiniOnHide || miniSideConditionForToggle,
    [forceMiniOnHide, miniSideConditionForToggle]
  );

  const toggleSidebar = () => {
    const closedStatus = isMiniNow ? 'mini' : 'hidden';
    console.log('TOGGLING', closedStatus);
    setSideStatus(sideStatus === 'full' ? closedStatus : 'full');
  };

  return {
    toggleSidebar,
    sideStatus,
    width: currentProperty.width,
    isMiniPage: miniPage,
  };
}
