import React from 'react';
import {
  SideContentProps,
  SideRendererRoot,
  SimpleSideNavItem,
} from '@hessed/ui/web/navs';
import { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core';
import { NavRenderItemBase } from '@hessed/ui/shared';

const renderItemLists: NavRenderItemBase[] = [];

const WriteSideRenderer = ({
  sideStatus,
  rootStyle,
  topNavHeight,
}: SideContentProps) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <SideRendererRoot
      isMini={sideStatus === 'mini'}
      topNavHeight={topNavHeight}
      rootStyle={{ ...rootStyle, padding: theme.spacing(4, 2) }}
    >
      {renderItemLists.map((x) => (
        <SimpleSideNavItem
          {...x}
          key={x.route}
          active={router.asPath === x.route}
          onClick={() => router.push(x.route)}
          sideSize={sideStatus}
        />
      ))}
    </SideRendererRoot>
  );
};

export default WriteSideRenderer;
