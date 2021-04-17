import { Avatar, Box, Button, Dialog, Typography } from '@material-ui/core';
import dy from 'dayjs';
import 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  CacheKey,
  ChatRoom,
  getChatUserFromInfo,
  useReserveAction,
} from '@hessed/client-module/seven-chat';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { NationFlagSquare, StackedAvatars } from '@hessed/ui/web/atom';

export interface DetailViewModalProps {
  chatRoom: ChatRoom | null;
  onClose: () => void;
  userInfo: SevenUserInfo;
  cacheKey: CacheKey;
  listIdx: number;
}

type LiveStatus = 'live' | 'not-started' | 'hasPast';

export const RoomDetailModal = ({
  chatRoom,
  onClose,
  userInfo,
  cacheKey,
  listIdx,
}: DetailViewModalProps) => {
  const [liveStatus, setliveStatus] = useState<LiveStatus>('not-started');

  const router = useRouter();

  const meAsChatUser = useMemo(() => {
    return getChatUserFromInfo(userInfo);
  }, [userInfo]);

  const isReserved = useMemo(() => {
    const { reserved } = chatRoom;
    return reserved.includes(meAsChatUser);
  }, [chatRoom, meAsChatUser]);

  const { onReserveClick } = useReserveAction({
    cacheKey,
    isReserved,
    listIdx,
    meAsChatUser,
  });

  const getLiveStatus = useCallback((): LiveStatus => {
    const { startTime } = chatRoom;
    const diff = dy().diff(startTime.toDate(), 'seconds');
    const min = diff / 60;
    if (min < 0) return 'not-started';
    else if (min > 0 && min < 7) return 'live';
    return 'hasPast';
  }, [chatRoom]);

  useEffect(() => {
    const secToLive = dy().diff(chatRoom.startTime.toDate(), 'minutes');
    setliveStatus(getLiveStatus);
    const liveTimeout =
      secToLive < 0
        ? setTimeout(() => {
            setliveStatus(getLiveStatus);
          }, secToLive * 60 * -1000)
        : null;
    const pastTimeout =
      secToLive < 0
        ? setTimeout(() => {
            setliveStatus(getLiveStatus);
          }, (secToLive - 7) * 60 * -1000)
        : null;

    return () => {
      liveTimeout && clearTimeout(liveTimeout);
      pastTimeout && clearTimeout(pastTimeout);
    };
  }, [chatRoom, getLiveStatus]);

  return (
    <Dialog open={Boolean(chatRoom)} onClose={onClose}>
      <Box maxWidth={350}>
        <Header>
          <div className="my-2">
            <NationFlagSquare nation={chatRoom.lang} shadow size={70} />
          </div>
          <Typography fontSize="1.4rem" color="#fff">
            {chatRoom.topic}
          </Typography>
          <HostProfileWrap>
            <Avatar src={chatRoom.host.photoURL} className="mr-2">
              {chatRoom.host.photoURL
                ? undefined
                : chatRoom.host.displayName[0]}
            </Avatar>
            <div>
              <Typography className="text-white mr-2" fontSize="0.8rem">
                {chatRoom.host.displayName}
              </Typography>
              <Typography className="text-gray-400 text-xs text-center">
                trusted
              </Typography>
            </div>
            <NationFlagSquare size={30} nation={chatRoom.host.localLang} />
          </HostProfileWrap>
        </Header>
        <Main>
          <Typography className="mr-2 mb-2 text-gray-400">
            Description :{' '}
          </Typography>
          <Typography>
            {chatRoom.description ?? 'No Description for this topic'}
          </Typography>
        </Main>
        <Footer>
          {chatRoom.reserved.length > 0 && (
            <LookForwardList>
              <StackedAvatars
                urls={chatRoom.reserved.map((x) => x.photoURL)}
                slicer={8}
                lightText
              />
            </LookForwardList>
          )}
          <ActionBox>
            {liveStatus === 'live' && (
              <ActionBtn
                onClick={() => router.push(`/app/seven/live/${chatRoom.id}`)}
              >
                JOIN
              </ActionBtn>
            )}
            {liveStatus === 'hasPast' && (
              <ActionBtn>Session Terminated</ActionBtn>
            )}
            {liveStatus === 'not-started' && (
              <>
                <span className="text-white text-center">
                  {dy(chatRoom.startTime.toDate()).fromNow()}
                </span>
                <div className="flex justify-center items-center w-full">
                  <ActionBtn onClick={onReserveClick}>
                    {isReserved ? 'Cancel' : 'Reserve'}
                  </ActionBtn>
                </div>
              </>
            )}
            {/* USE EFFECT EMPTY CALLBACK TO MAKE RERENDER AT THIS TIME */}
          </ActionBox>
        </Footer>
      </Box>
    </Dialog>
  );
};

const Header = styled.div(({ theme }) => ({
  minWidth: 300,
  minHeight: 220,
  padding: theme.spacing(2, 4),
  background: theme.palette.primary.main,
  borderRadius: '0 0 0 30%',
}));

const HostProfileWrap = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(1.5, 2.5),
}));

const Main = styled.div(({ theme }) => ({
  padding: theme.spacing(4, 5),
}));

const Footer = styled.div(({ theme }) => ({
  padding: theme.spacing(1, 3),
  background: theme.palette.primary.main,
}));

const LookForwardList = styled.div(({ theme }) => ({
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
const ActionBox = styled.div(({ theme }) => ({
  padding: theme.spacing(1, 3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ActionBtn = styled(Button)(({ theme }) => ({
  flex: '1 0 auto',
  padding: theme.spacing(0.7, 2),
  margin: theme.spacing(0, 3),
  fontSize: '1.2rem',
  border: '2px solid #fff',
  boxShadow: '2px 2px 0px 0px rgba(255,255,255,0.71)',
  color: '#fff',
}));
