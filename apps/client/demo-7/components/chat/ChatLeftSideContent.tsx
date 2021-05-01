import { ChatLiveUser } from '@hessed/client-module/seven-chat';
import { UserListCard } from '@hessed/ui/web/list';
import { Divider, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { MicAvatarMisc, CrownAvatarMisc } from '@hessed/ui/web/atom';
import { useLiveVolumeStore } from '../../hooks/chat/useVolumeStore';
interface ChatLeftSideContentProps {
  users: ChatLiveUser[];
  hostId: string;
}

interface SpeakerInfos {
  speakers: ChatLiveUser[];
  listeners: ChatLiveUser[];
}

export const ChatLeftSideContent = ({
  users,
  hostId,
}: ChatLeftSideContentProps) => {
  const userVolumeMap = useLiveVolumeStore((store) => store.volMap);
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
      {speakerInfos.speakers.map((x) => {
        const volume =
          userVolumeMap.get(x.liveUid) > 5 ? userVolumeMap.get(x.liveUid) : 0;
        return (
          <div className="w-full px-3" key={x.uid}>
            <UserListCard
              uid={x.uid}
              photoURL={x.photoURL}
              displayName={x.displayName}
              timeStampInfo={x.joinedAt.toDate()}
              onClick={() => console.log('Hello')}
              userSubtitle={x.role}
              RootMisc={() => <RootMisc volume={volume} />}
              AvatarMisc={() => (
                <>
                  {hostId === x.uid && <CrownAvatarMisc />}
                  {x.role === 'host' && <MicAvatarMisc volume={volume} />}
                </>
              )}
            />
          </div>
        );
      })}
      <div className="w-full pt-3">
        <Divider />
      </div>
      <UserLabel>Listeners</UserLabel>
      {speakerInfos.listeners.map((x) => (
        <div key={x.uid} className="w-full px-3">
          <UserListCard
            uid={x.uid}
            photoURL={x.photoURL}
            displayName={x.displayName}
            timeStampInfo={x.joinedAt.toDate()}
            onClick={() => console.log('Hello')}
            userSubtitle={x.role}
            AvatarMisc={() => (
              <>
                {x.role === 'host' && (
                  <MicAvatarMisc volume={userVolumeMap.get(x.liveUid) ?? 0} />
                )}
              </>
            )}
          />
        </div>
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

const RootMisc = styled.div<{ volume: number }>(({ theme, volume }) => ({
  position: 'absolute',
  width: `${volume}%`,
  height: 4,
  left: 0,
  bottom: 0,
  background: theme.palette.primary.main,
}));
