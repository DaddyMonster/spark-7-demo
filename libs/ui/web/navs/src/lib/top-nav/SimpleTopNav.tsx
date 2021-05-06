import { GoogleButton } from '@hessed/ui/web/atom';
import { alpha, Grid, Hidden, Menu, MenuItem } from '@material-ui/core';
import { NextRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  LogoBox,
  NavRoute,
  UserProfileBox,
  UserProfileBoxProps,
} from '../top-nav';
import { TopNavMenuListItem } from './nav-box';
import { motion } from 'framer-motion';

export interface AuthButtonPropBase {
  onLogin: () => void;
  onLogout: () => void;
  onRegister?: () => void;
  isLogged: boolean;
}

export interface SimpleTopNavProps<P extends AuthButtonPropBase> {
  hideRoutes?: boolean;
  transparental?: boolean;
  router: NextRouter;
  login: () => void;
  logout: () => void;
  register?: () => void;
  toggleSidebar?: () => void;
  logoPath: string;
  showSideToggle?: boolean;
  __active_test__?: boolean;
  topMenuList: TopNavMenuListItem[];
  topNavHeight: number;
  profileProps?: UserProfileBoxProps;
  AuthBtnComponent?: React.ComponentType<P>;
  authBtnProps?: Omit<P, 'onLogin' | 'onLogout' | 'isLogged' | 'onRegister'>;
  hideRoot?: boolean;
}

export function SimpleTopNav<P extends AuthButtonPropBase>({
  hideRoutes = false,
  transparental = false,
  login,
  router,
  logout,
  register,
  toggleSidebar,
  logoPath,
  showSideToggle = true,
  __active_test__,
  topMenuList,
  topNavHeight,
  profileProps,
  AuthBtnComponent = GoogleButton,
  authBtnProps = {} as P,
  hideRoot = false,
}: SimpleTopNavProps<P>) {
  const [anchor, setanchor] = useState<HTMLElement | null>(null);
  const onThumbClick = (e: HTMLElement) => {
    setanchor(anchor ? null : e);
  };
  return (
    <>
      <Root
        transparental={transparental}
        topNavHeight={topNavHeight}
        initial={{ y: 0 }}
        animate={{ y: hideRoot ? -1 * topNavHeight : 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={6} md={3}>
            <LogoBox
              logoPath={logoPath}
              showSideToggle={router.asPath !== '/' || showSideToggle}
              onLogoClick={() => router.push('/')}
              onSideToggle={() => toggleSidebar && toggleSidebar()}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item md={6}>
              {!hideRoutes && (
                <div className="w-full h-full">
                  <NavRoute
                    hidden={!profileProps}
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
            {profileProps && router.asPath !== '/' ? (
              <UserProfileBox
                {...profileProps}
                navHeight={topNavHeight}
                onThumbClick={onThumbClick}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-end">
                <AuthBtnComponent
                  {...(authBtnProps as P)}
                  onLogin={login}
                  onLogout={logout}
                  isLogged={Boolean(profileProps)}
                  onRegister={register}
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
}

export const Root = styled(motion.div)<{
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
