import React from 'react';
import { Nation } from '@hessed/client-module/seven-shared';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';

export interface NationFlagSquareProps {
  nation: Nation;
  size?: number;
  onClick?: (lang: Nation) => void;
  shadow?: boolean;
  disabled?: boolean;
}

type FlagMap = {
  [key in Nation]: string;
};
const flagMap: FlagMap = {
  en: '/flags/us-flag.svg',
  ko: '/flags/korea-flag.svg',
};

export const NationFlagSquare = ({
  nation,
  size = 35,
  onClick = () => void {},
  shadow,
  disabled = false,
}: NationFlagSquareProps) => {
  return (
    <FlagAvatar
      src={flagMap[nation]}
      $size={size}
      onClick={() => onClick(nation)}
      $shadow={shadow}
      $disabled={disabled}
    />
  );
};

const FlagAvatar = styled(Avatar).attrs({ variant: 'rounded' })<{
  $size: number;
  $shadow: boolean;
  $disabled: boolean;
}>(({ theme, $size, $shadow, $disabled }) => ({
  width: $size * 1.2,
  height: $size,
  border: `2px solid ${theme.palette.secondary.main}`,
  opacity: $disabled ? 0.5 : 1,
  boxShadow: $shadow ? '1.5px 1.5px 0px 0px rgba(0,0,0,0.8)' : 'none',
}));