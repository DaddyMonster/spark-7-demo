import React from 'react';
import { SimpleTopNav } from '@hessed/ui/web/navs';
import {
  LOG_APP_TOP_NAV_HEIGHT,
  LogAppTopNavMenuList,
} from '@hessed/client-module/logapp-shared';
import { useRouter } from 'next/router';
export const LogAppTopNav = () => {
  const router = useRouter();
  return (
    <SimpleTopNav
      topNavHeight={LOG_APP_TOP_NAV_HEIGHT}
      router={router}
      logoPath="/logo/log-app-head.svg"
      topMenuList={LogAppTopNavMenuList}
      login={() => void {}}
      logout={() => void {}}
    />
  );
};
