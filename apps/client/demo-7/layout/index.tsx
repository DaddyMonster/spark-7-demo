/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import { LayoutWithSidebar } from '@hessed/ui/web/layout';
import { SevenTopNav } from '@hessed/ui/web/navs';
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
} as const;

export default SevenLayout;
