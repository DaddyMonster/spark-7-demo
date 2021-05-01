import React from 'react';
import { Nation } from '@hessed/client-module/seven-shared';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';

type FlagShape = 'rounded' | 'circular';

export interface NationFlagProps {
  nation?: Nation;
  src?: string;
  size?: number;
  onClick?: (lang: Nation) => void;
  shadow?: boolean;
  disabled?: boolean;
  className?: string;
  type?: FlagShape;
}

type FlagMap = {
  [key in Nation]: string;
};
const flagMap: FlagMap = {
  en: '/flags/en.svg',
  ko: '/flags/ko.svg',
};

export const NationFlag = ({
  nation,
  size = 35,
  onClick = () => void {},
  shadow,
  disabled = false,
  className = '',
  src,
  type = 'rounded',
}: NationFlagProps) => {
  const url = nation ? flagMap[nation] : src;
  if (!url) {
    throw new Error('No Src or Nation Provided for NationFlag Component');
  }

  return (
    <FlagAvatar
      src={url}
      $size={size}
      $type={type}
      onClick={() => onClick(nation)}
      $shadow={shadow}
      $disabled={disabled}
      className={className}
      variant={type}
    />
  );
};

const FlagAvatar = styled(Avatar)<{
  $size: number;
  $shadow: boolean;
  $disabled: boolean;
  $type: FlagShape;
}>(({ theme, $size, $shadow, $disabled, $type }) => ({
  width: $type === 'circular' ? $size : $size * 1.2,
  height: $size,
  border: `2px solid ${theme.palette.secondary.main}`,
  opacity: $disabled ? 0.5 : 1,
  boxShadow: $shadow ? '1.5px 1.5px 0px 0px rgba(0,0,0,0.8)' : 'none',
}));
