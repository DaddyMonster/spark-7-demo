import { IconButton } from '@material-ui/core';
import React from 'react';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';
interface Props<T> {
  Icon: IconType;
  label: string;
  id: string;
  value?: T;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    value: T
  ) => void;
  active: boolean;
  alwaysVisible: boolean;
}

export function FixedFloatButton<T>({
  Icon,
  active,
  id,
  value,
  onClick,
  alwaysVisible,
}: Props<T>) {
  return (
    <CustomIconButton
      onClick={(e) => onClick(e, id, value)}
      active={active}
      alwaysVisible={alwaysVisible}
    >
      <Icon />
    </CustomIconButton>
  );
}

const CustomIconButton = styled(IconButton)<{
  active: boolean;
  alwaysVisible: boolean;
}>(({ theme, active, alwaysVisible }) => ({
  color: active ? theme.palette.danger.main : '',
  [theme.breakpoints.up('lg')]: {
    visibility: alwaysVisible ? 'visible' : 'hidden',
  },
}));
