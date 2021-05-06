import { LOG_APP_TOP_NAV_HEIGHT } from '@hessed/client-module/logapp-shared';
import { LayoutRoot } from '@hessed/ui/web/layout';
import React from 'react';
import { LogAppTopNav } from '../components/top-nav/LogAppTopNav';
import { useTopNavHiddenStore } from '../hooks/top-nav/useTopNavHiddenStore';

export const AppBaseLayout: React.FC = ({ children }) => {
  const hideRoot = useTopNavHiddenStore((store) => store.hideRoot);
  return (
    <LayoutRoot
      TopNavComponent={LogAppTopNav}
      topNavProps={{ hideRoot, topNavHeight: LOG_APP_TOP_NAV_HEIGHT }}
    >
      {children}
    </LayoutRoot>
  );
};
