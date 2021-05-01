import { ChatLiveUser } from '@hessed/client-module/seven-chat';
import { Mic } from '@hessed/ui/web/atom';
import {
  alpha,
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import styled from 'styled-components';
interface ChatUserListCardProps extends ChatLiveUser {
  volume: number | undefined;
}

export const ChatUserListCard = ({
  displayName,
  //liveUid,
  //nation,
  photoURL,
  role,
  //uid,
  volume,
}: ChatUserListCardProps) => {
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
            <Button
              variant="text"
              sx={{ fontSize: '0.8rem' }}
              className="ml-auto"
            >
              Follow
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

const VolBg = styled(motion.div)(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  background: theme.palette.secondary.main,
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
