import React from 'react';
import { Nation } from '../../types/nation';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
interface Props {
  nation: Nation;
  sizes?: number;
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

export const NationFlag = ({
  nation,
  sizes: size = 25,
  onClick,
  shadow = false,
  disabled = false,
}: Props) => {
  return (
    <FlagAvatar
      $shadow={shadow}
      size={size}
      src={flagMap[nation]}
      onClick={() => onClick && onClick(nation)}
      disabled={disabled}
    />
  );
};

const FlagAvatar = styled(Avatar)<{
  size: number;
  $shadow: boolean;
  disabled: boolean;
}>(({ theme, size, $shadow: shadow, disabled }) => ({
  width: size,
  height: size,
  border: 'none',
  opacity: disabled ? 0.5 : 1,
  '&:hover': {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  boxShadow: shadow ? '1.5px 1.5px 0px 0px rgba(0,0,0,0.8)' : 'none',
}));
