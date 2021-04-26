import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { BsMic, BsMicMute } from 'react-icons/bs';

export const MicAvatar = styled(IconButton).attrs({ variant: 'rounded' })<{
  $micOn: boolean;
  vol: number;
}>(({ theme, $micOn: micOn, vol }) => ({
  width: 45,
  height: 45,
  background: 'none',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: theme.shadows[1],
  '& svg': {
    fill: micOn ? theme.palette.danger.main : theme.palette.grey[600],
    fontSize: '1.7rem',
  },
}));

export interface MicProps {
  micOn: boolean;
  vol: number;
  className?: string;
}

export const Mic = ({ micOn, vol, className = '' }: MicProps) => {
  return (
    <MicAvatar $micOn={micOn} vol={vol} className={className}>
      {micOn ? <BsMic /> : <BsMicMute />}
    </MicAvatar>
  );
};
