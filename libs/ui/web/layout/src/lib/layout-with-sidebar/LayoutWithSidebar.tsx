import React from 'react';
import { AppRoot } from '../layout-root';
import { Sidebar, SidebarProps } from './Sidebar';

export interface LayoutWithSidebarProps<T, P> extends SidebarProps<P> {
  TopNavComponent: React.ComponentType<T>;
  topNavProps?: T;
  children: React.ReactNode;
}

export function LayoutWithSidebar<T, P>({
  SidebarContent,
  TopNavComponent,
  children,
  topNavHeight,
  topNavProps,
  sideContentProps,
  rootStyle = {},
}: LayoutWithSidebarProps<T, P>) {
  return (
    <AppRoot>
      <TopNavComponent {...topNavProps} />
      <Sidebar
        rootStyle={rootStyle}
        SidebarContent={SidebarContent}
        topNavHeight={topNavHeight}
        sideContentProps={sideContentProps}
      >
        {children}
      </Sidebar>
    </AppRoot>
  );
}
