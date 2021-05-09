import React from 'react';
import { SimpleTopNav, AuthButtonPropBase } from '@hessed/ui/web/navs';
import { LogAppTopNavMenuList } from '@hessed/client-module/logapp-shared';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import { useLogoutMutation } from '@hessed/gql/log-app';
import { useApolloClient } from '@apollo/client';
import { motion } from 'framer-motion';

const AuthButtonSet = ({
  onLogin,
  onLogout,
  onRegister,
  isLogged,
}: AuthButtonPropBase) => {
  if (isLogged) {
    return <Button onClick={() => onLogout()}>Logout</Button>;
  }
  return (
    <>
      <MotionButton
        className="px-3 mr-3"
        variant="contained"
        onClick={() => onLogin()}
        layoutId="login-btn"
      >
        Login
      </MotionButton>
      <MotionButton onClick={() => onRegister()} layoutId="register-btn">
        Register
      </MotionButton>
    </>
  );
};
const MotionButton = motion(Button);

interface LogAppTopNavProps {
  hideRoot: boolean;
  topNavHeight: number;
}

const transparentalPaths = ['/', '/read/[postId]', '/login', '/register'];
export const LogAppTopNav = ({ hideRoot, topNavHeight }: LogAppTopNavProps) => {
  const router = useRouter();
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    const { data } = await logout();
    if (data.logout) {
      await client.clearStore();
      router.push('/');
    }
  };
  return (
    <SimpleTopNav
      topNavHeight={topNavHeight}
      router={router}
      logoPath="/logo/log-app-head.svg"
      topMenuList={LogAppTopNavMenuList}
      login={() => router.push('/login')}
      logout={() => handleLogout()}
      register={() => router.push('/register')}
      AuthBtnComponent={AuthButtonSet}
      transparental={transparentalPaths.includes(router.asPath)}
      hideRoot={hideRoot}
    />
  );
};
