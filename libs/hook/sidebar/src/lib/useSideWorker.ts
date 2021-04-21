import { Theme, useMediaQuery } from '@material-ui/core';
import { useEffect } from 'react';
import { SidebarProperty } from './sidebar-preset';
import { useSideStore } from './useSideStore';

export function useSideWorker() {
  const {
    setSideStatus,
    sideProperty,
    miniPage,
    forceMiniOnHide,
    sideStatus,
  } = useSideStore();

  const fullSideCondition = useShouldKickIn(sideProperty.full, !miniPage);
  useEffect(() => {
    if (fullSideCondition) {
      console.log('SIDE FULL KICKING IN');
      setSideStatus('full');
    }
  }, [fullSideCondition, setSideStatus]);

  const forceMini = sideStatus !== 'full' && forceMiniOnHide;
  const miniSideCondition =
    useShouldKickIn(sideProperty.mini, miniPage) || forceMini;
  useEffect(() => {
    if (miniSideCondition) {
      console.log('SIDE MINI KICKING IN');
      setSideStatus('mini');
    }
  }, [miniSideCondition, setSideStatus]);

  const hideSideCondition = useShouldKickIn(
    sideProperty.hidden,
    !forceMiniOnHide
  );
  useEffect(() => {
    if (hideSideCondition) {
      console.log('SIDE HIDDEN KICKING IN');
      setSideStatus('hidden');
    }
  }, [hideSideCondition, setSideStatus]);

  return null;
}

export const useShouldKickIn = (
  prop: SidebarProperty,
  extraCondition?: boolean
) => {
  const { kickIn, upDown } = prop;
  const condition = useMediaQuery((theme: Theme) =>
    theme.breakpoints[upDown](kickIn)
  );
  return condition && extraCondition;
};
