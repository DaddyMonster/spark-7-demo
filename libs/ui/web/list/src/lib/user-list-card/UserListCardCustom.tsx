import { Avatar, Paper, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ColorOptionUnion } from '@hessed/styles/theme';

interface RootPaperProps {
  active: boolean;
  activeColUni: ColorOptionUnion;
  height: number | string;
  rootStyle: Record<string, unknown>;
}

export interface UserListCardCustomProps extends Partial<RootPaperProps> {
  displayName: string;
  uid: string;
  photoURL?: string;
  idx?: number;
  onClick?: (e: React.MouseEvent, id: string, idx: number) => void;
  AvatarMisc?: React.ComponentType;
  PreAvatar?: React.ComponentType;
  EndMisc?: React.ComponentType;
  children?: React.ReactNode;
  avatarSize?: number;
}

export const UserListCardCustom = ({
  displayName,
  EndMisc,
  onClick,
  uid,
  idx,
  photoURL,
  AvatarMisc,
  PreAvatar,
  children,
  height = 80,
  avatarSize = 65,
  active = false,
  activeColUni = 'secondary',
  rootStyle = {},
}: UserListCardCustomProps) => {
  return (
    <RootPaper
      height={height}
      onClick={(e) => onClick && onClick(e, uid, idx)}
      active={active}
      activeColUni={activeColUni}
      rootStyle={rootStyle}
    >
      {PreAvatar && <PreAvatar />}
      <AvatarWrap>
        {AvatarMisc && <AvatarMisc />}
        <Avatar sx={{ width: avatarSize, height: avatarSize }} src={photoURL}>
          {photoURL ? undefined : displayName[0]}
        </Avatar>
      </AvatarWrap>
      <div className="h-full w-full flex flex-col justify-center relative">
        <Typography fontSize="0.85rem" className="pt-1">
          {displayName}
        </Typography>
        {children}
      </div>
      {EndMisc && <EndMisc />}
    </RootPaper>
  );
};

const RootPaper = styled(Paper)<RootPaperProps>(
  ({ height, theme, active, activeColUni, rootStyle = {} }) => ({
    width: '100%',
    flex: '1 0 auto',
    height,
    display: 'flex',
    position: 'relative',
    padding: theme.spacing(1.5),
    margin: theme.spacing(1, 1, 0.5),
    borderRadius: 8,
    boxShadow: theme.shadows[2],
    border: active ? `2px solid ${theme.palette[activeColUni].main}` : 'none',
    ...rootStyle,
  })
);

const AvatarWrap = styled.div(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2.5),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
