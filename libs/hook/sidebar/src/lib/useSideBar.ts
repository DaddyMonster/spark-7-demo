/* eslint-disable react-hooks/rules-of-hooks */
import { Theme, useMediaQuery } from '@material-ui/core';
import { useEffect, useMemo } from 'react';
import { SidebarStatus } from './sidebar-preset';
import { useSideStore } from './useSideStore';

export interface UseSidebarReturn {
  sideStatus: SidebarStatus;
  toggleSidebar: () => void;
  width: number;
}

export function useSidebar(): UseSidebarReturn {
  const {
    setSideStatus,
    sideStatus,
    sideProperty,
    isMini,
    toggleMini,
  } = useSideStore();

  const currentProperty = useMemo(() => sideProperty[sideStatus], [
    sideStatus,
    sideProperty,
  ]);

  useEffect(() => {
    toggleMini(isMini);
    return () => {
      if (isMini) toggleMini(false);
      const normalStatus = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
      )
        ? 'hidden'
        : 'full';
      setSideStatus(normalStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMini]);

  const toggleSidebar = () => {
    const newSize = sideStatus === 'full' ? 'hidden' : isMini ? 'mini' : 'full';
    setSideStatus(newSize);
  };

  return { toggleSidebar, sideStatus, width: currentProperty.width };
}
