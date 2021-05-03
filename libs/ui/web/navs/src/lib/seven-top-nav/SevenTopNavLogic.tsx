import { useSevenAuth } from '@hessed/client-module/seven-auth';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { SimpleTopNavProps } from '../top-nav/SimpleTopNav';
import { useSidebar } from '@hessed/hook/sidebar';
import { SimpleTopNavLogicProps } from '../top-nav/app-top-nav-basic-props';
import {
  TopNavMenuList,
  SEVEN_TOP_NAV_HEIGHT,
} from '@hessed/client-module/seven-shared';
const SevenTopNavLogic = ({
  hideRoutes,
  transparental,
  NavComponent,
  showSideToggle,
}: SimpleTopNavLogicProps) => {
  const router = useRouter();
  const logoPath = '/spark-7.svg';
  const { login, logout, user } = useSevenAuth();
  const { toggleSidebar } = useSidebar();

  const props: SimpleTopNavProps = useMemo(
    () => ({
      login,
      logout,
      logoPath,
      router,
      toggleSidebar,
      hideRoutes,
      transparental,
      showSideToggle,
      topMenuList: TopNavMenuList,
      topNavHeight: SEVEN_TOP_NAV_HEIGHT,
      profileProps: {
        displayName: user.displayName,
        subDisplay: user.reputation,
        photoURL: user.photoURL ?? '',
      },
    }),
    [
      login,
      logout,
      logoPath,
      router,
      toggleSidebar,
      hideRoutes,
      transparental,
      showSideToggle,
      user,
    ]
  );
  return <NavComponent {...props} />;
};

export default SevenTopNavLogic;
