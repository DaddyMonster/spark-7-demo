import { Grid } from '@material-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../../hooks/auth';
import { UserDetail } from '../../../model/user-detail';
import { GoogleBtn } from '../../atoms/button/GoogleBtn';
import { NavRoute } from './NavRoute';
import { Root } from './Root';
import { UserThumb } from './UserThumb';

interface TopNavProps {
  transparental?: boolean;
}

export const TopNav = ({ transparental = false }: TopNavProps) => {
  const { loginUser, logout, user } = useAuth();
  const router = useRouter();
  return (
    <Root transparental={transparental}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <div className="flex items-center">
            <Image src="/spark-7.svg" width="160px" height="50px" />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="w-full h-full">
            <NavRoute hidden={!user} />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex h-full items-center">
            {user && router.asPath !== '/' ? (
              <UserThumb {...user} />
            ) : (
              <GoogleBtn
                onLogout={logout}
                isLogged={Boolean(user)}
                onLogin={loginUser}
                redirectTo="/app/seven/home"
                showLogout
              />
            )}
          </div>
        </Grid>
      </Grid>
    </Root>
  );
};
