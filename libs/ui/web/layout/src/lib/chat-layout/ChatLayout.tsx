import { Grid, Hidden } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
export interface ChatLayoutProps {
  subtractHeight: number;
  children: React.ReactNode;
  LeftSideContent: React.ComponentType;
  RightSideContent: React.ComponentType;
  leftShowCondition: boolean;
  rightShowCondition: boolean;
}

export const ChatLayout = ({
  subtractHeight,
  children,
  LeftSideContent,
  RightSideContent,
  leftShowCondition,
  rightShowCondition,
}: ChatLayoutProps) => {
  const APP_HEIGHT_STRING = `calc(100vh - ${subtractHeight}px)`;
  return (
    <>
      <Root height={APP_HEIGHT_STRING}>
        <Grid container spacing={0} sx={{ height: '100%' }}>
          <Hidden mdDown>
            <Grid item md={3} sx={{ height: APP_HEIGHT_STRING }}>
              <div className="w-full h-full">
                <LeftSideContent />
              </div>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={9} lg={5} sx={{ height: APP_HEIGHT_STRING }}>
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
      {leftShowCondition && (
        <ResponsiveSideContentWrap
          side="left"
          variants={SideVariants}
          custom={'left'}
          initial="init"
          animate={leftShowCondition ? 'load' : 'init'}
        >
          <LeftSideContent />
        </ResponsiveSideContentWrap>
      )}
      {rightShowCondition && (
        <ResponsiveSideContentWrap
          side="right"
          variants={SideVariants}
          custom={'right'}
          initial="init"
          animate={rightShowCondition ? 'load' : 'init'}
        >
          <RightSideContent />
        </ResponsiveSideContentWrap>
      )}
    </>
  );
};

const Root = styled.div<{ height: string }>(({ theme, height }) => ({
  width: '100%',
  height,
}));

const ResponsiveSideContentWrap = styled(motion.div)<{
  side: 'left' | 'right';
}>(({ side, theme }) => ({
  width: 320,
  height: '100vh',
  position: 'fixed',
  left: side === 'left' ? 0 : 'none',
  right: side === 'right' ? 0 : 'none',
  top: 0,
  zIndex: 3000,
  background: theme.palette.default.main,
}));

const SideVariants: Variants = {
  init: (side: 'left' | 'right') => {
    const factor = side === 'left' ? -1 : 1;
    return {
      x: 310 * factor,
    };
  },
  load: {
    x: 0,
  },
};
