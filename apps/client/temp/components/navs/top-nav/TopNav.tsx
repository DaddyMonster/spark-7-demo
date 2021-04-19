import { Grid, Hidden, IconButton, Menu, MenuItem } from '@material-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useAuth } from '../../../hooks/auth';
import {
  LeftSidebarSizeEnum,
  useLeftSideStore,
} from '../../../layout/left-side-bar/useLeftSideStore';
import { GoogleBtn } from '../../atoms/button/GoogleBtn';
import { NavRoute } from './NavRoute';
import { Root } from './Root';
import { UserThumb } from './UserThumb';
/* import Spark7 from '../../svg/spark-7.svg'; */

interface TopNavProps {
  transparental?: boolean;
}

export const TopNav = ({ transparental = false }: TopNavProps) => {
  const { loginUser, logout, user } = useAuth();
  const router = useRouter();
  const [menuAnchor, setmenuAnchor] = useState<HTMLElement | null>(null);
  const [{ size }, setLeftSize] = useLeftSideStore();
  const handleSideSize = () => {
    setLeftSize(
      size !== LeftSidebarSizeEnum.Hidden
        ? LeftSidebarSizeEnum.Hidden
        : LeftSidebarSizeEnum.Normal
    );
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <>
      <Root transparental={transparental}>
        <Grid container spacing={0}>
          <Grid item xs={6} md={3}>
            <div className="flex h-full items-center">
              <Hidden mdUp>
                <IconButton onClick={handleSideSize}>
                  <HiMenuAlt2 />
                </IconButton>
              </Hidden>
              {/* <Spark7 width="160px" height="50px" /> */}
              <Image
                alt="logo-7"
                src="/spark-7.svg"
                width="160px"
                height="50px"
                onClick={handleLogoClick}
              />
            </div>
          </Grid>
          <Hidden mdDown>
            <Grid item md={6}>
              <div className="w-full h-full">
                <NavRoute hidden={!user} />
              </div>
            </Grid>
          </Hidden>
          <Grid item md={3} xs={6}>
            <div className="flex w-full h-full items-center justify-end">
              {user && router.asPath !== '/' ? (
                <UserThumb
                  {...user}
                  onThumbClick={(e) => setmenuAnchor(e.currentTarget)}
                />
              ) : (
                <GoogleBtn
                  onLogout={logout}
                  isLogged={Boolean(user)}
                  onLogin={loginUser}
                  redirectTo="/app/seven/home"
                  showLogout
                  className="ml-auto"
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Root>

      <Menu
        style={{ zIndex: 3000 }}
        id="simple-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={() => setmenuAnchor(null)}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      >
        <MenuItem onClick={() => setmenuAnchor(null) /* TEMP */}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            setmenuAnchor(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
