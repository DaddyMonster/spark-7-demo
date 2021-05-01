import { SevenUserInfo } from '@hessed/client-module/seven-auth';

import { GoogleButton } from '@hessed/ui/web/atom';
import { alpha, Grid, Hidden, Menu, MenuItem } from '@material-ui/core';
import { NextRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LogoBox, NavRoute, UserProfileBox } from '../top-nav';
import { TopNavMenuListItem } from './nav-box';

export interface SimpleTopNavProps {
  hideRoutes?: boolean;
  transparental?: boolean;
  router: NextRouter;
  login: () => void;
  logout: () => void;
  toggleSidebar: () => void;
  user: SevenUserInfo;
  logoPath: string;
  showSideToggle?: boolean;
  __active_test__?: boolean;
  topMenuList: TopNavMenuListItem[];
  topNavHeight: number;
}

export const SimpleTopNav = ({
  hideRoutes = false,
  transparental = false,
  login,
  router,
  logout,
  toggleSidebar,
  user,
  logoPath,
  showSideToggle = true,
  __active_test__,
  topMenuList,
  topNavHeight,
}: SimpleTopNavProps) => {
  const [anchor, setanchor] = useState<HTMLElement | null>(null);
  const onThumbClick = (e: HTMLElement) => {
    setanchor(anchor ? null : e);
  };
  return (
    <>
      <Root transparental={transparental} topNavHeight={topNavHeight}>
        <Grid container spacing={0}>
          <Grid item xs={6} md={3}>
            <LogoBox
              logoPath={logoPath}
              showSideToggle={router.asPath !== '/' || showSideToggle}
              onLogoClick={() => router.push('/')}
              onSideToggle={toggleSidebar}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item md={6}>
              {!hideRoutes && (
                <div className="w-full h-full">
                  <NavRoute
                    hidden={!user}
                    topMenuList={topMenuList}
                    onRouteClick={(path) => router.push(path)}
                    routeAsPath={router.asPath}
                    __active_test__={__active_test__}
                  />
                </div>
              )}
            </Grid>
          </Hidden>
          <Grid item md={3} xs={6}>
            {user && router.asPath !== '/' ? (
              <UserProfileBox
                displayName={user.displayName}
                navHeight={topNavHeight}
                onThumbClick={onThumbClick}
                subDisplay={user.reputation.toUpperCase() + 'user'}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-end">
                <GoogleButton
                  isLogged={Boolean(user)}
                  onLogin={login}
                  onLogout={logout}
                  className="px-3"
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Root>
      <Menu
        style={{ zIndex: 3000 }}
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={() => setanchor(null)}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      >
        <MenuItem onClick={() => setanchor(null) /* TEMP */}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            setanchor(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export const Root = styled.div<{
  transparental?: boolean;
  topNavHeight: number;
}>(({ theme, transparental = false, topNavHeight }) => ({
  display: 'flex',
  padding: theme.spacing(0, 3),
  boxShadow: theme.shadows[transparental ? 0 : 2],
  height: topNavHeight,
  background: alpha('#ffffff', transparental ? 0 : 1),
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
}));
