import React from 'react';
import { SimpleSideNavRenderer } from '@hessed/ui/web/navs';
import { useRouter } from 'next/router';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import { SevenSideItems } from '@hessed/client-module/seven-shared';
import { SideContentProps } from '@hessed/ui/web/layout';

const SevenSideRenderer = ({
  toggleSidebar,
  sideStatus,
  isMiniPage,
}: SideContentProps) => {
  const router = useRouter();
  return (
    <SimpleSideNavRenderer
      asPath={router.asPath}
      onLinkClick={(route) => router.push(route)}
      topNavHeight={SEVEN_TOP_NAV_HEIGHT}
      navItems={SevenSideItems}
      toggleSidebar={toggleSidebar}
      sideStatus={sideStatus}
      isMiniPage={isMiniPage}
    />
  );
};

export default SevenSideRenderer;
