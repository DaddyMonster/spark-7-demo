/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo } from 'react';
import { SidebarStatus } from './sidebar-preset';
import { useSideStore } from './useSideStore';

export interface UseSideBarProps {
  isMini?: boolean;
}

export interface UseSidebarReturn {
  sideStatus: SidebarStatus;
  toggleSidebar: () => void;
  width: number;
}

export function useSidebar({
  isMini = false,
}: UseSideBarProps): UseSidebarReturn {
  const {
    setSideStatus,
    sideStatus,
    sideProperty,
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMini]);

  const toggleSidebar = () => {
    const shouldMini = sideStatus !== 'full' && isMini;
    const newSize =
      sideStatus === 'full' ? 'hidden' : shouldMini ? 'mini' : 'full';
    setSideStatus(newSize);
  };

  return { toggleSidebar, sideStatus, width: currentProperty.width };
}
