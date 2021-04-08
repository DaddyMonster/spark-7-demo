import { Container } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { TopNav } from '../components/navs/top-nav/TopNav';
import { TOP_NAV_HEIGHT } from '../constants/layout-sizes';
import { AppRoot } from './index-page-base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LiveRoomLayout = ({ children }: any) => {
  return (
    <AppRoot>
      <TopNav />
      <Container
        maxWidth="lg"
        sx={{ height: `calc(100vh - ${TOP_NAV_HEIGHT}px)` }}
      >
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </Container>
    </AppRoot>
  );
};

export default LiveRoomLayout;
