import { Avatar, Paper, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';
import dy from 'dayjs';
import rel from 'dayjs/plugin/relativeTime';
dy.extend(rel);
export interface UserListCardProps {
  uid: string;
  displayName: string;
  photoURL?: string;
  userSubtitle: string;
  timeStampInfo: Date;
  AvatarMisc?: React.ComponentType;
  RootMisc?: React.ComponentType;
  PreAvatar?: React.ComponentType;
  idx?: number;
  onClick: (id: string, idx: number) => void;
}

export const USER_LIST_CARD_HEIGHT = 70;

export const UserListCard = ({
  displayName,
  photoURL,
  timeStampInfo,
  uid,
  userSubtitle,
  AvatarMisc,
  RootMisc,
  idx = -1,
  PreAvatar,
  onClick,
}: UserListCardProps) => {
  return (
    <Root onClick={() => onClick(uid, idx)}>
      {RootMisc && <RootMisc />}
      <Wrapper>
        {PreAvatar && <PreAvatar />}
        <AvatarWrap>
          {AvatarMisc && <AvatarMisc />}
          <Avatar src={photoURL}>
            {photoURL ? undefined : displayName[0]}
          </Avatar>
        </AvatarWrap>
        <div className="h-full w-full flex flex-col justify-center relative">
          <Typography fontSize="0.85rem" className="pt-1">
            {displayName}
          </Typography>
          <Typography fontSize="0.65rem" sx={{ color: grey[500] }}>
            {userSubtitle}
          </Typography>
          <TimeStamper>{dy(timeStampInfo).format('HH:MM')}</TimeStamper>
        </div>
      </Wrapper>
    </Root>
  );
};

const Root = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0.5),
  marginBottom: theme.spacing(0.25),
  width: '100%',
  height: USER_LIST_CARD_HEIGHT,
  boxShadow: theme.shadows[3],
  position: 'relative',
  borderRadius: 10,
}));

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  padding: theme.spacing(1, 1.5),
  alignItems: 'center',
  position: 'relative',
}));

const AvatarWrap = styled.div(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
}));

const TimeStamper = styled.span(({ theme }) => ({
  color: theme.palette.grey[400],
  position: 'absolute',
  right: theme.spacing(0.3),
  bottom: theme.spacing(0.3),
  fontSize: '0.7rem',
}));
