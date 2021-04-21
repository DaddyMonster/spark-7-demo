import React from 'react';
import { SimpleSideNavRenderer } from '@hessed/ui/web/navs';
import { useRouter } from 'next/router';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import { SevenSideItems } from '@hessed/client-module/seven-shared';
interface SevenSideRendererProps {
  isMini?: boolean;
}

const SevenSideRenderer = ({ isMini = false }: SevenSideRendererProps) => {
  const router = useRouter();
  return (
    <SimpleSideNavRenderer
      isMini={isMini}
      asPath={router.asPath}
      onLinkClick={(route) => router.push(route)}
      topNavHeight={SEVEN_TOP_NAV_HEIGHT}
      navItems={SevenSideItems}
    />
  );
};

export default SevenSideRenderer;
