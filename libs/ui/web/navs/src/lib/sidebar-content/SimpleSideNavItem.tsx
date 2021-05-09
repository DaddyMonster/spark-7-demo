import React from 'react';
import { NavRenderItemBase } from '@hessed/ui/shared';
import { SidebarStatus } from '@hessed/hook/sidebar';
import styled from 'styled-components';
import { alpha, Typography } from '@material-ui/core';

export interface SimpleSideNavItemProps extends NavRenderItemBase {
  active: boolean;
  onClick: (route: string) => void;
  sideSize: SidebarStatus;
}

export const SimpleSideNavItem = ({
  Icon,
  active,
  label,
  onClick,
  route,
  sideSize,
}: SimpleSideNavItemProps) => {
  return (
    <Root active={active} sideSize={sideSize} onClick={() => onClick(route)}>
      <Icon />
      {sideSize === 'full' && <Typography>{label}</Typography>}
    </Root>
  );
};

const Root = styled.div<{ active: boolean; sideSize: SidebarStatus }>(
  ({ theme, active, sideSize }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5, 0, 1.5, sideSize === 'full' ? 2 : 0),
    marginBottom: theme.spacing(2),
    background: active ? theme.palette.primary.main : 'none',
    boxShadow: active
      ? `3px 3px 0px 0px ${alpha(theme.palette.grey[700], 0.5)}`
      : 'none',
    borderRadius: 5,
    zIndex: 500,
    cursor: 'pointer',
    '& svg': {
      fontSize: '1.7rem',
      fill: active || sideSize === 'mini' ? '#fff' : theme.palette.grey[600],
      marginRight: sideSize !== 'mini' ? theme.spacing(1.5) : 0,
      marginLeft: sideSize === 'mini' ? theme.spacing(0.5) : 0,
      borderRadius: '50%',
      transition: 'all 300ms ease',
    },
    '& p': {
      fontSize: '1rem',
      color: active ? '#fff' : theme.palette.grey[600],
    },
  })
);
