import { ChatLiveUser } from '@hessed/client-module/seven-chat';
import { ChatUserListCard } from '@hessed/ui/web/list';
import { Divider, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import styled from 'styled-components';
interface ChatLeftSideContentProps {
  users: ChatLiveUser[];
}

interface SpeakerInfos {
  speakers: ChatLiveUser[];
  listeners: ChatLiveUser[];
}

export const ChatLeftSideContent = ({ users }: ChatLeftSideContentProps) => {
  const speakerInfos = useMemo((): SpeakerInfos => {
    const speakers: ChatLiveUser[] = [];
    const listeners: ChatLiveUser[] = [];
    users.forEach((user) => {
      user.role === 'host' ? speakers.push(user) : listeners.push(user);
    });
    return { speakers, listeners };
  }, [users]);

  return (
    <Root>
      <UserLabel>Speakers</UserLabel>
      {speakerInfos.speakers.map((x) => (
        <ChatUserListCard
          photoURL={x.photoURL}
          displayName={x.displayName}
          liveUid={x.liveUid}
          nation={x.nation}
          role={x.role}
          uid={x.uid}
          volume={50}
        />
      ))}
      <Divider />
      <UserLabel>Listeners</UserLabel>
      {speakerInfos.listeners.map((x) => (
        <ChatUserListCard
          photoURL={x.photoURL}
          displayName={x.displayName}
          liveUid={x.liveUid}
          nation={x.nation}
          role={x.role}
          uid={x.uid}
          volume={50}
        />
      ))}
    </Root>
  );
};

const Root = styled.div(({ theme }) => ({
  width: 'calc(100% - 2px)',
  height: '100%',
  background: theme.palette.default.main,
  boxShadow: theme.shadows[6],
}));

const UserLabel = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  color: theme.palette.grey[600],
  fontSize: '0.7rem',
}));
