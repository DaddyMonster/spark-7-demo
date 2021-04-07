import { Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { TopNavMenuList } from '../../../constants/top-nav-menu-list';
interface Props {
  hidden?: boolean;
}

export const NavRoute = ({ hidden = false }: Props) => {
  const router = useRouter();

  const active = useMemo(() => {
    return TopNavMenuList.find((x) => router.asPath.match(new RegExp(x.href)));
  }, [router.asPath]);

  return (
    <div className="h-full flex justify-center  items-center">
      {active && (
        <TabParent
          value={active?.href ?? '/'}
          onChange={(_, val) => router.push(val)}
        >
          {!hidden &&
            TopNavMenuList.map((x) => (
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
