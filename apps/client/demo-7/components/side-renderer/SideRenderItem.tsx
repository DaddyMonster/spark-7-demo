import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { RenderItem } from '../../constants/sidebar-items';
import { LeftSidebarSizeEnum } from '../../layout/left-side-bar';
interface Props extends RenderItem {
  selected: boolean;
  onClick: (route: string) => void;
  size?: LeftSidebarSizeEnum;
}

export const SideRenderItem = ({
  Icon,
  label,
  selected,
  onClick,
  route,
  size = LeftSidebarSizeEnum.Normal,
}: Props) => {
  return (
    <Root selected={selected} onClick={() => onClick(route)} sideSize={size}>
      <Icon />
      {size === LeftSidebarSizeEnum.Normal && <Typography>{label}</Typography>}
    </Root>
  );
};

const Root = styled.div<{ selected: boolean; sideSize: LeftSidebarSizeEnum }>(
  ({ theme, selected, sideSize }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding:
      sideSize === LeftSidebarSizeEnum.Normal
        ? theme.spacing(1.5, 0, 1.5, 2)
        : 0,
    marginBottom: theme.spacing(2),
    background: selected ? theme.palette.primary.main : 'none',
    boxShadow: selected ? '3px 3px 0px 0px rgba(0,0,0,0.71)' : 'none',
    borderRadius: 5,
    zIndex: 500,
    '& svg': {
      fontSize: '1.7rem',
      fill: selected ? '#fff' : theme.palette.grey[600],
      marginRight: theme.spacing(2),
    },
    '& p': {
      fontSize: '1rem',
      color: selected ? '#fff' : theme.palette.grey[600],
    },
  })
);
