import { Grid, Hidden } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
export interface ChatLayoutProps {
  subtractHeight: number;
  children: React.ReactNode;
  LeftSideContent: React.ComponentType;
  RightSideContent: React.ComponentType;
}

export const ChatLayout = ({
  subtractHeight,
  children,
  LeftSideContent,
  RightSideContent,
}: ChatLayoutProps) => {
  const APP_HEIGHT_STRING = `calc(100vh - ${subtractHeight}px)`;
  return (
    <Root height={APP_HEIGHT_STRING}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Hidden mdDown>
          <Grid item md={4} lg={3} sx={{ height: APP_HEIGHT_STRING }}>
            <div className="w-full h-full">
              <LeftSideContent />
            </div>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={8} lg={5} sx={{ height: APP_HEIGHT_STRING }}>
          {children}
        </Grid>
        <Hidden smDown>
          <Grid
            item
            xs={4}
            sx={{ height: APP_HEIGHT_STRING, position: 'relative' }}
          >
            <RightSideContent />
          </Grid>
        </Hidden>
      </Grid>
    </Root>
  );
};

const Root = styled.div<{ height: string }>(({ theme, height }) => ({
  width: '100%',
  height,
}));
