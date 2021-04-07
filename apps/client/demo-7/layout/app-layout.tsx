import React from 'react';
import { TopNav } from '../components/navs/top-nav/TopNav';
import { useAuth } from '../hooks/auth';
import { AppRoot } from './index-page-base';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppLayout = ({ children }: any) => {
  const { user } = useAuth();
  return (
    <AppRoot>
      <TopNav />
      {children}
    </AppRoot>
  );
};

export default AppLayout;
