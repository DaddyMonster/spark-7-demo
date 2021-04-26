import { SidebarStatus } from '@hessed/hook/sidebar';
import { NavRenderItemBase } from '@hessed/ui/shared';
import React from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import styled, { CSSObject } from 'styled-components';
import SimpleSideNavItem from './SimpleSideNavItem';

export interface SideContentProps {
  sideStatus: SidebarStatus;
}

interface SimpleSideNavRendererProps extends SideContentProps {
  topNavHeight: number;
  navItems: NavRenderItemBase[];
  asPath: string;
  onLinkClick: (route: string) => void;
  rootStyle?: CSSObject;
  rootClassName?: string;
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
      style={rootStyle}
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

const SideRendererRoot = styled.div<{
  topNavHeight: number;
  isMini: boolean;
}>(({ theme, topNavHeight, isMini }) => ({
  width: '100%',
  height: `calc(100vh - ${topNavHeight}px)`,
  padding: theme.spacing(6, 0, 2, 1),
  boxShadow: theme.shadows[3],
  background: isMini ? theme.palette.primary.main : 'none',
  transition: '300ms background ease',
}));
