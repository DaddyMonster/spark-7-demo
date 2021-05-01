import React from 'react';
import styled from 'styled-components';
import { Avatar, Hidden, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export type OnThumbClick = (e: HTMLElement) => void;

export interface UserProfileBoxProps {
  photoURL?: string;
  displayName: string;
  onThumbClick: OnThumbClick;
  navHeight: number;
  subDisplay: string;
}

export function UserProfileBox({
  photoURL,
  displayName,
  onThumbClick,
  navHeight,
  subDisplay,
}: UserProfileBoxProps) {
  return (
    <Root navHeight={navHeight}>
      <Avatar
        src={photoURL}
        alt={displayName}
        onClick={(e) => onThumbClick(e.currentTarget)}
      >
        {photoURL ? undefined : displayName[0]}
      </Avatar>
      <Hidden smDown>
        <TextWrapper>
          <Typography>{displayName}</Typography>
          <Typography fontSize="0.5rem" sx={{ color: grey[500] }}>
            {subDisplay}
          </Typography>
        </TextWrapper>
      </Hidden>
    </Root>
  );
}

const Root = styled.div<{ navHeight: number }>(({ navHeight }) => ({
  height: navHeight,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
}));

const TextWrapper = styled.div(({ theme }) => ({
  marginLeft: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
