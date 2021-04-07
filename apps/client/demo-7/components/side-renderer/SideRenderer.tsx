import { useRouter } from 'next/router';
import React from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';
import { TOP_NAV_HEIGHT } from '../../constants/layout-sizes';
import { RenderItem } from '../../constants/sidebar-items';
import { SideRenderItem } from './SideRenderItem';
interface Props {
  navItems: RenderItem[];
}

export const SideRenderer = ({ navItems }: Props) => {
  const router = useRouter();
  return (
    <SideRendererRoot>
      <Scrollbar>
        {navItems.map((x) => (
          <SideRenderItem
            {...x}
            key={x.route}
            selected={Boolean(router.asPath.match(new RegExp(x.route)))}
            onClick={() => router.push(x.route)}
          />
        ))}
      </Scrollbar>
    </SideRendererRoot>
  );
};

const SideRendererRoot = styled.div(({ theme }) => ({
  width: '100%',
  height: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
  padding: theme.spacing(6, 0, 2, 1),
  boxShadow: theme.shadows[3],
}));
