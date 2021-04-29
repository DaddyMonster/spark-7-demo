import { Avatar, Paper, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import styled from 'styled-components';
interface RootProps {
  width: string | number;
  height: string | number;
  $rootStyle: Record<string, unknown>;
}
type PhotoType = 'avatar' | 'float';

export interface VerticalLgCardProps extends Partial<RootProps> {
  RootMisc?: React.ComponentType;
  PhotoMisc?: React.ComponentType;
  photoURL?: string;
  photoType?: PhotoType;
  photoSize?: number;
  displayName: string;
  subDisplayName: string;
  children: React.ReactNode;
  id: string;
  idx?: number;
  onClick?: (e: React.MouseEvent, id: string, idx?: number) => void;
}

export const VerticalLgCard = ({
  height = 'auto',
  width = '100%',
  children,
  displayName,
  photoType = 'avatar',
  photoSize = 90,
  photoURL,
  subDisplayName,
  $rootStyle = {},
  RootMisc,
  id,
  PhotoMisc,
  onClick,
  idx,
}: VerticalLgCardProps) => {
  return (
    <RootPaper
      width={width}
      height={height}
      $rootStyle={$rootStyle}
      onClick={(e) => onClick && onClick(e, id, idx)}
    >
      {RootMisc && <RootMisc />}
      <PhotoWrap
        className={photoType === 'avatar' ? 'mx-auto' : ''}
        photoSize={photoSize}
        photoType={photoType}
      >
        {PhotoMisc && <PhotoMisc />}
        <Avatar
          src={photoURL}
          alt={displayName}
          sx={{
            width: photoType === 'avatar' ? photoSize : '100%',
            height: photoSize,
          }}
        />
      </PhotoWrap>
      <div className="mx-auto flex flex-col">
        <Typography fontSize="1.1rem" textAlign="center">
          {displayName}
        </Typography>
        <Typography
          fontSize="0.7rem"
          textAlign="center"
          sx={{ color: grey[600] }}
        >
          {subDisplayName}
        </Typography>
      </div>
      {children}
    </RootPaper>
  );
};

const RootPaper = styled(Paper)<RootProps>(
  ({ theme, height, width, $rootStyle }) => ({
    width,
    height,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    position: 'relative',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
    ...$rootStyle,
  })
);

const PhotoWrap = styled.div<{ photoType: PhotoType; photoSize: number }>(
  ({ theme, photoType, photoSize }) => ({
    width: photoType === 'avatar' ? 'auto' : '100%',
    height: photoType === 'avatar' ? 'auto' : photoSize,
    padding: photoType === 'avatar' ? theme.spacing(2.5) : 0,
    marginBottom: theme.spacing(1.5),
    position: 'relative',
  })
);
