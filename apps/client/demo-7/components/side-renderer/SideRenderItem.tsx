import React from 'react';
import { RenderItem } from '../../constants/sidebar-items';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
interface Props extends RenderItem {
  selected: boolean;
  onClick: (route: string) => void;
}

export const SideRenderItem = ({
  Icon,
  label,
  selected,
  onClick,
  route,
}: Props) => {
  return (
    <Root selected={selected} onClick={() => onClick(route)}>
      <Icon />
      <Typography>{label}</Typography>
    </Root>
  );
};

const Root = styled.div<{ selected: boolean }>(({ theme, selected }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0, 1.5, 2),
  margin: theme.spacing(0, 0, 2, 2),
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
}));
