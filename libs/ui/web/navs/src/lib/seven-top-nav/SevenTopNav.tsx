import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import React from 'react';
import styled from 'styled-components';
import { SEVEN_TOP_NAV_HEIGHT, } from '@hessed/client-module/seven-shared';
import { alpha, Grid, Hidden } from '@material-ui/core';
import { LogoBox, NavRoute } from '../top-nav';
import { useRouter } from 'next/router';
import { useSidebar } from '@hessed/hook/sidebar';
export interface SevenTopNavProps {
  hideRoutes: boolean;
  userInfo: SevenUserInfo;
  transparental?: boolean;
}

export const SevenTopNav = ({
  hideRoutes,
  userInfo,
  transparental,
}: SevenTopNavProps) => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  return (
    <Root transparental={transparental}>
      <Grid container spacing={0}>
        <Grid item xs={6} md={3}>
          <LogoBox
            logoPath="/spark-7.svg"
            showSideToggle={router.asPath !== '/'}
            onLogoClick={() => router.push('/')}
            onSideToggle={toggleSidebar}
          />
        </Grid>
        <Hidden mdDown>
          <Grid item md={6}>
            <div className="w-full h-full">
              <NavRoute hidden={!userInfo} topMenuList={} />
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </Root>
  );
};

export const Root = styled.div<{ transparental?: boolean }>(
  ({ theme, transparental = false }) => ({
    display: 'flex',
    padding: theme.spacing(0, 2),
    boxShadow: theme.shadows[transparental ? 0 : 2],
    height: SEVEN_TOP_NAV_HEIGHT,
    background: alpha('#ffffff', transparental ? 0 : 1),
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
  })
);
