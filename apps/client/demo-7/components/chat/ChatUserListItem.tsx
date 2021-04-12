import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  alpha,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { motion, useMotionValue, Variant } from 'framer-motion';
import { BsMic, BsMicMute } from 'react-icons/bs';
import styled from 'styled-components';
import { LiveJoinedUser } from '../../model/chat-meta';
interface Props extends LiveJoinedUser {
  volume: number | undefined;
}

const ChatUserListItem = ({
  volume,
  displayName,
  nation,
  photoURL,
  uid,
  isIn,
  liveUid,
  role,
}: Props) => {
  const absWidth = useMotionValue(0);
  return (
    <Paper className="flex px-4 py-2 mb-2 items-center relative">
      <VolBg initial={{ width: '0%' }} animate={{ width: `${volume}%` }} />
      <Grid container className="relative" style={{ zIndex: 1 }}>
        <Grid item xs={2}>
          <div className="w-full h-full flex justify-center items-center">
            <Mic micOn={role === 'host'} vol={volume * 100} />
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="h-full w-full flex items-center px-2">
            <UserAvatar
              photoURL={photoURL}
              displayName={displayName}
              volume={volume}
            />
            <Typography>{displayName}</Typography>
            <Button variant="text" sx={{ fontSize: '0.8rem' }} className="ml-auto">
              Follow
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChatUserListItem;

interface MicProps {
  micOn: boolean;
  vol: number;
  className?: string;
}

const VolBg = styled(motion.div)(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  background: theme.palette.secondary.main,
}));

const Mic = ({ micOn, vol, className = '' }: MicProps) => {
  return (
    <MicAvatar $micOn={micOn} vol={vol} className={className}>
      {micOn ? <BsMic /> : <BsMicMute />}
    </MicAvatar>
  );
};

const MicAvatar = styled(IconButton).attrs({ variant: 'rounded' })<{
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

interface UserAvatarProps {
  volume: number;
  photoURL: string;
  displayName: string;
}
const MotionAvatar = motion(Avatar);
const UserAvatar = ({
  volume = 0.001,
  photoURL,
  displayName,
}: UserAvatarProps) => {
  const scaleVal = useMemo(() => volume / 150, [volume]);

  return (
    <MotionAvatar
      initial={{ scale: 0, borderWidth: 0 }}
      sx={{
        width: 35,
        height: 35,
        borderColor: alpha('#61A0AF', 0.7),
        marginRight: 4,
      }}
      animate={{ scale: 1 + scaleVal, borderWidth: scaleVal * 2 }}
    >
      {photoURL ? undefined : displayName[0]}
    </MotionAvatar>
  );
};
