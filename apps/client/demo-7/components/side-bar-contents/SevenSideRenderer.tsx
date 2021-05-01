import React from 'react';
import { SimpleSideNavRenderer } from '@hessed/ui/web/navs';
import { useRouter } from 'next/router';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import { SevenSideItems } from '@hessed/client-module/seven-shared';
import { SideContentProps } from '@hessed/ui/web/navs';
import { alpha, useTheme } from '@material-ui/core';

const SevenSideRenderer = ({ sideStatus }: SideContentProps) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <SimpleSideNavRenderer
      rootStyle={{
        position: 'relative',
        background: 'url(/img/flare.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        '&:before': {
          background: alpha(theme.palette.black.main, 0.95),
          content: "''",
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
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
