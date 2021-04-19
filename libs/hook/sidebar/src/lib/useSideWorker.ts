/* eslint-disable react-hooks/rules-of-hooks */
import { Breakpoint, useMediaQuery, useTheme } from '@material-ui/core';
import { useCallback, useEffect, useMemo } from 'react';
import { SidebarPreset, SidebarStatus } from './sidebar-preset';
import { useSideStore } from './useSideStore';

interface UseSideWorkerProps {
  sideProperties?: SidebarPreset;
}

// PUT THIS ON WHERE SIDEBAR IS!

export function useSideWorker({ sideProperties }: UseSideWorkerProps) {
  const theme = useTheme();
  const { setSideStatus, sideStatus, setSideProp, isMini } = useSideStore();

  useEffect(() => {
    if (!sideProperties) return;
    setSideProp(sideProperties);
  }, [sideProperties, setSideProp]);

  const currentWidthKey = useMemo(() => {
    const keys = [...theme.breakpoints.keys].reverse();
    return keys.reduce((output: Breakpoint | null, key: Breakpoint) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null || 'xs');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { kickIn, upDown } = sideProperties['mini'];
    if (isMini && useMediaQuery(theme.breakpoints[upDown][kickIn])) {
      sideSetter('mini');
      return;
    }
    Object.keys(sideProperties).forEach((x: SidebarStatus) => {
      const { kickIn, upDown } = sideProperties[x];
      if (useMediaQuery(theme.breakpoints[upDown][kickIn])) {
        sideSetter(x);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWidthKey, isMini]);

  const sideSetter = useCallback(
    (newStatus: SidebarStatus) => {
      if (sideStatus !== newStatus) {
        setSideStatus(newStatus);
      }
    },
    [sideStatus, setSideStatus]
  );
}
