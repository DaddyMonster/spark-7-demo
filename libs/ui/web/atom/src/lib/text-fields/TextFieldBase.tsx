import { InputBase } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export const TextFieldBase = styled(InputBase)(({ theme }) => ({
  flex: '1 0 auto',
  height: '100%',
  padding: theme.spacing(0.5, 1),
  border: `2px solid ${theme.palette.grey[600]}`,
  borderRadius: 5,
  '&:focus': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

export const HiddenFieldBase = styled(InputBase)(({ theme }) => ({
  flex: '1 0 auto',
  height: '100%',
  padding: theme.spacing(0.5, 1),
  color: 'transparent',
}));

export const TextFieldLike = styled.div<{ isFocused: boolean }>(
  ({ theme, isFocused }) => ({
    flex: '1 0 auto',
    height: '100%',
    padding: theme.spacing(1),
    border: isFocused
      ? `2px solid ${theme.palette.grey[600]}`
      : `2px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    display: 'flex',
    position: 'relative',
    flexWrap: 'wrap',
    alignItems: 'center',
    minHeight: 45,
  })
);

export interface TextFieldLikeWrapProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  active: boolean;
}

export const TextFieldLikeWrap = ({
  children,
  onClick,
  active,
}: TextFieldLikeWrapProps) => {
  return (
    <TextFieldLike isFocused={active} onClick={onClick}>
      {children}
    </TextFieldLike>
  );
};
