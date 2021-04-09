import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { FiMic, FiMicOff } from 'react-icons/fi';
import styled from 'styled-components';
import { LiveJoinedUser } from '../../model/chat-meta';
interface Props extends LiveJoinedUser {
  volume: number;
}

const ChatUserListItem = ({
  volume,
  displayName,
  nation,
  photoURL,
  uid,
  isIn,
  micOn,
}: Props) => {
  return (
    <Paper className="flex px-4 py-2 mb-2 items-center">
      <Grid container>
        <Grid item xs={2}>
          <div className="w-full h-full flex justify-center items-center">
            <Mic micOn={micOn} vol={volume * 100} />
          </div>
        </Grid>
        <Grid item xs={7}>
          <div className="h-full w-full flex items-center px-2">
            <Avatar
              src={photoURL}
              className="mr-2"
              sx={{ width: 35, height: 35 }}
            >
              {photoURL ? undefined : displayName[0]}
            </Avatar>
            <Typography>{displayName}</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <Button variant="text" sx={{ fontSize: '0.8rem' }}>
            Follow
          </Button>
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

const Mic = ({ micOn, vol, className = '' }: MicProps) => {
  return (
    <MicAvatar micOn={micOn} vol={vol} className={className}>
      {micOn ? <FiMic /> : <FiMicOff />}
    </MicAvatar>
  );
};

const MicAvatar = styled(Avatar).attrs({ variant: 'rounded' })<{
  micOn: boolean;
  vol: number;
}>(({ theme, micOn, vol }) => ({
  width: 35,
  height: 35,
  background: 'none',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: theme.shadows[1],
  '& svg': {
    fill: micOn ? theme.palette.danger.main : theme.palette.grey[600],
    fontSize: '1.7rem',
  },
  '&:before': {
    content: "''",
    width: '100%',
    height: `${vol}%`,
    position: 'absolute',
    background: theme.palette.black.main,
  },
}));
