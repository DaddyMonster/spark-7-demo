import React from 'react';
import { SimpleSideNavRenderer } from '@hessed/ui/web/navs';
import { useRouter } from 'next/router';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import { SevenSideItems } from '@hessed/client-module/seven-shared';
import { SideContentProps } from '@hessed/ui/web/navs';
import { useTheme } from '@material-ui/core';

const SevenSideRenderer = ({ sideStatus }: SideContentProps) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <SimpleSideNavRenderer
      rootStyle={{
        background: theme.palette.black.main,
      }}
      asPath={router.asPath}
      onLinkClick={(route) => {
        router.push(route);
      }}
      topNavHeight={SEVEN_TOP_NAV_HEIGHT}
      navItems={SevenSideItems}
      sideStatus={sideStatus}
    />
  );
};

export default SevenSideRenderer;
