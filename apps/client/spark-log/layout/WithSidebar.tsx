import React from 'react';
import { SideContentProps } from '@hessed/ui/web/navs';
import { AppBaseLayout } from './AppBaseLayout';
import { Sidebar } from '@hessed/ui/web/layout';
import { LOG_APP_TOP_NAV_HEIGHT } from '@hessed/client-module/logapp-shared';

interface WithSidebarProps<P> {
  SidebarContent: React.ComponentType<P & SideContentProps>;
  sideContentProps?: P;
  children: React.ReactNode;
  rootStyle?: Record<string, unknown>;
}

function WithSidebar<P>({
  SidebarContent,
  sideContentProps,
  children,
  rootStyle = {},
}: WithSidebarProps<P>) {
  return (
    <AppBaseLayout>
      <Sidebar
        SidebarContent={SidebarContent}
        topNavHeight={LOG_APP_TOP_NAV_HEIGHT}
        sideContentProps={sideContentProps}
        rootStyle={rootStyle}
      >
        {children}
      </Sidebar>
    </AppBaseLayout>
  );
}

export default WithSidebar;
