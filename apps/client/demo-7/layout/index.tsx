/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomAppLayoutType } from '@hessed/client-lib/custom-types';
import { LayoutWithSidebar } from '@hessed/ui/web/layout';
import { SevenTopNav } from '@hessed/ui/web/navs';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
const SevenLayout = {
  NO_LAYOUT: ({ children, ...props }: any) => <>{children}</>,
  SEVEN_LAYOUT: ({ children, ...props }: any) => (
    <LayoutWithSidebar
      SidebarContent={() => <div></div>}
      TopNavComponent={SevenTopNav}
      topNavHeight={SEVEN_TOP_NAV_HEIGHT}
      topNavProps={{}}
    >
      {children}
    </LayoutWithSidebar>
  ),
} as const;

export default SevenLayout;
