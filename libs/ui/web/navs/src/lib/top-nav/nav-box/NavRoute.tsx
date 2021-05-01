import { Tab, Tabs } from '@material-ui/core';
import React, { useMemo } from 'react';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

export interface TopNavMenuListItem {
  href: string;
  label: string;
  Icon: IconType;
  regex: RegExp;
}

export interface NavRouteProps {
  topMenuList: TopNavMenuListItem[];
  hidden: boolean;
  routeAsPath: string;
  onRouteClick: (path: string) => void;
  __active_test__?: boolean;
}
export const NavRoute = ({
  hidden = false,
  topMenuList,
  routeAsPath,
  onRouteClick,
  __active_test__,
}: NavRouteProps) => {
  const active = useMemo(() => {
    return topMenuList.find((x) => x.regex.test(routeAsPath));
  }, [routeAsPath, topMenuList]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      {(active || __active_test__) && !hidden && (
        <TabParent
          centered
          value={active?.href ?? '/'}
          onChange={(_, val) => onRouteClick(val)}
        >
          {topMenuList.map((x) => (
            <TopNavTabItems key={x.href} value={x.href} label={x.label} />
          ))}
        </TabParent>
      )}
    </div>
  );
};

const TabParent = styled(Tabs).attrs({
  classes: { flexContainer: 'cont', indicator: 'indi' },
})(({ theme }) => ({
  height: '100%',
  '& .cont': {
    height: '100%',
  },
  '& .indi': {
    transition: 'all 200ms ease',
    height: 3,
  },
}));

interface TopNavTabItemProps {
  fontSize?: number | string;
}

export const TopNavTabItems = styled(Tab)<TopNavTabItemProps>(
  ({ theme, fontSize = '0.8rem' }) => ({
    fontFamily: theme.typography.fontFam.menu,
    fontSize,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      width: 90,
    },
    color: theme.palette.primary.main,
    '& .Mui-selected': {
      color: theme.palette.secondary.main,
      transform: 'scale(1.1)',
      transition: '200ms ease',
    },
  })
);
