/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomAppLayoutType } from '@hessed/client-lib/custom-types';
import { LayoutWithSidebar } from '@hessed/ui/web/layout';
import { SevenTopNav } from '@hessed/ui/web/navs';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import SevenSideRenderer from '../components/side-bar-contents/SevenSideRenderer';
const SevenLayout = {
  NO_LAYOUT: ({ children, ...props }: any) => <>{children}</>,
  SEVEN_NORMAL_LAYOUT: ({ children, ...props }: any) => {
    return (
      <LayoutWithSidebar
        SidebarContent={SevenSideRenderer}
        TopNavComponent={SevenTopNav}
        topNavHeight={SEVEN_TOP_NAV_HEIGHT}
        topNavProps={{}}
        {...props}
      >
        {children}
      </LayoutWithSidebar>
    );
  },
  SEVEN_MINI_SIDE_LAYOUT: ({ children, ...props }: any) => {
    return (
      <LayoutWithSidebar
        SidebarContent={SevenSideRenderer}
        TopNavComponent={SevenTopNav}
        topNavHeight={SEVEN_TOP_NAV_HEIGHT}
        sideContentProps={{ isMini: true }}
        topNavProps={{}}
      >
        {children}
      </LayoutWithSidebar>
    );
  },
} as const;

export default SevenLayout;
