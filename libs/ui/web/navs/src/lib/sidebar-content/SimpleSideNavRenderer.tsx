import { useSidebar, useSideStore } from '@hessed/hook/sidebar';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Scrollbar from 'react-perfect-scrollbar';
import { NavRenderItemBase } from '@hessed/ui/shared';
import SimpleSideNavItem from './SimpleSideNavItem';

interface SimpleSideNavRendererProps {
  topNavHeight: number;
  isMini: boolean;
  navItems: NavRenderItemBase[];
  asPath: string;
  onLinkClick: (route: string) => void;
}

export function SimpleSideNavRenderer({
  topNavHeight,
  isMini,
  navItems,
  asPath,
  onLinkClick,
}: SimpleSideNavRendererProps) {
  const toggleMini = useSideStore((state) => state.toggleMini);
  const { toggleSidebar, sideStatus } = useSidebar();
  useEffect(() => {
    toggleMini(isMini);
  }, [isMini, toggleMini]);

  return (
    <SideRendererRoot topNavHeight={topNavHeight}>
      <div
        onMouseOver={() => isMini && toggleSidebar()}
        onMouseLeave={() => isMini && toggleSidebar(true)}
      >
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

const SideRendererRoot = styled.div<{ topNavHeight: number }>(
  ({ theme, topNavHeight }) => ({
    width: '100%',
    height: `calc(100vh - ${topNavHeight}px)`,
    padding: theme.spacing(6, 0, 2, 1),
    boxShadow: theme.shadows[3],
  })
);
