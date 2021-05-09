import { SidebarStatus } from '@hessed/hook/sidebar';
import { NavRenderItemBase } from '@hessed/ui/shared';
import React from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { SimpleSideNavItem } from './SimpleSideNavItem';
import {
  SideRendererRoot,
  SideRendererRootProps,
} from './SimpleSideNavRenderRoot';

export interface SideContentProps {
  sideStatus: SidebarStatus;
  topNavHeight: number;
  rootStyle: Record<string, unknown>;
}

export interface SimpleSideNavRendererProps
  extends SideContentProps,
    SideRendererRootProps {
  navItems: NavRenderItemBase[];
  asPath: string;
  onLinkClick: (route: string) => void;
}

export function SimpleSideNavRenderer({
  topNavHeight,
  navItems,
  asPath,
  onLinkClick,
  sideStatus,
  rootStyle = {},
  rootClassName = '',
}: SimpleSideNavRendererProps) {
  return (
    <SideRendererRoot
      topNavHeight={topNavHeight}
      isMini={sideStatus === 'mini'}
      className={rootClassName}
      rootStyle={rootStyle}
    >
      <div>
        <Scrollbar>
          {navItems.map((x) => (
            <SimpleSideNavItem
              {...x}
              key={x.route}
              active={new RegExp(x.route).test(asPath)}
              onClick={() => onLinkClick(x.route)}
              sideSize={sideStatus}
            />
          ))}
        </Scrollbar>
      </div>
    </SideRendererRoot>
  );
}
