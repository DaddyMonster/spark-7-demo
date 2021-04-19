import React from 'react';
import styled from 'styled-components';
import { Avatar, Hidden, Typography } from '@material-ui/core';

export type OnThumbClick<T> = (e: HTMLElement, id: T) => void;

export interface UserProfileBoxProps<T> {
  photoURL?: string;
  displayName: string;
  id: T;
  onThumbClick: OnThumbClick<T>;
  navHeight: number;
  subDisplay: string;
}

export function UserProfileBox<T>({
  photoURL,
  displayName,
  onThumbClick,
  navHeight,
  id,
  subDisplay,
}: UserProfileBoxProps<T>) {
  return (
    <Root
      navHeight={navHeight}
      onClick={(e) => onThumbClick(e.currentTarget, id)}
    >
      <Avatar src={photoURL} alt={displayName}>
        {photoURL ? undefined : displayName[0]}
      </Avatar>
      <Hidden smDown>
        <TextWrapper>
          <Typography>{displayName}</Typography>
          <Typography fontSize="0.8rem">{subDisplay}</Typography>
        </TextWrapper>
      </Hidden>
    </Root>
  );
}

const Root = styled.div<{ navHeight: number }>(({ navHeight }) => ({
  height: navHeight,
  display: 'flex',
  alignItems: 'center',
}));

const TextWrapper = styled.div(({ theme }) => ({
  marginLeft: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
