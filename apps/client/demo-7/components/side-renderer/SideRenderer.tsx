import { useRouter } from 'next/router';
import React from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';
import { TOP_NAV_HEIGHT } from '../../constants/layout-sizes';
import { RenderItem } from '../../constants/sidebar-items';
import {
  LeftSidebarSizeEnum,
  useLeftSideStore,
} from '../../layout/left-side-bar';
import { SideRenderItem } from './SideRenderItem';
interface Props {
  navItems: RenderItem[];
  handleSidebar?: (bool: boolean) => void;
}

export const SideRenderer = ({ navItems, handleSidebar }: Props) => {
  const router = useRouter();
  const [{ size }, setSize] = useLeftSideStore();

  return (
    <SideRendererRoot>
      <div
        onMouseOver={() => handleSidebar && handleSidebar(true)}
        onMouseLeave={() => handleSidebar && handleSidebar(false)}
        style={{ overflowX: 'hidden' }}
      >
        <Scrollbar options={{ suppressScrollX: true }}>
          {navItems.map((x) => (
            <SideRenderItem
              {...x}
              size={size}
              key={x.route}
              selected={Boolean(router.asPath.match(new RegExp(x.route)))}
              onClick={() => router.push(x.route)}
            />
          ))}
        </Scrollbar>
      </div>
    </SideRendererRoot>
  );
};

const SideRendererRoot = styled.div(({ theme }) => ({
  width: '100%',
  height: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
  padding: theme.spacing(6, 0, 2, 1),
  boxShadow: theme.shadows[3],
}));
