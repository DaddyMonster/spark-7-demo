import { Avatar, Box, Button, Dialog, Typography } from '@material-ui/core';
import dy from 'dayjs';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useReservedChat } from '../../hooks/chat';
import { ChatMeta } from '../../model/chat-meta';
import { NationFlag } from '../flag/NationFlag';
import StackedAvatars from '../icons/StackedAvatars';
export interface DetailViewModalProps {
  chatMeta: ChatMeta | null;
  onClose: () => void;
}

type LiveStatus = 'live' | 'not-started' | 'hasPast';

const DetailViewModal = ({ chatMeta, onClose }: DetailViewModalProps) => {
  const [liveStatus, setliveStatus] = useState<LiveStatus>('not-started');
  const { addReserved, removeReserved, reserved } = useReservedChat();
  const router = useRouter();

  const isReservedChat = useMemo(() => {
    const { id } = chatMeta;
    if (reserved.findIndex((x) => x.id === id) > -1) {
      return true;
    }
    return false;
  }, [chatMeta, reserved]);

  useEffect(() => {
    const secToLive = dy().diff(chatMeta.startTime.toDate(), 'minutes');
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
  }, [chatMeta]);

  const getLiveStatus = useCallback((): LiveStatus => {
    const { startTime } = chatMeta;
    const diff = dy().diff(startTime.toDate(), 'seconds');
    const min = diff / 60;
    if (min < 0) return 'not-started';
    else if (min > 0 && min < 7) return 'live';
    return 'hasPast';
  }, [chatMeta]);

  const reserveHandler = () => {
    if (isReservedChat) {
      removeReserved(chatMeta.id);
    } else {
      addReserved(chatMeta);
    }
  };

  return (
    <Dialog open={Boolean(chatMeta)} onClose={onClose}>
      <Box maxWidth={350}>
        <Header>
          <div className="my-2">
            <NationFlag nation={chatMeta.lang} shadow sizes={70} />
          </div>
          <Typography fontSize="1.4rem" color="#fff">
            {chatMeta.topic}
          </Typography>
          <HostProfileWrap>
            <Avatar src={chatMeta.host.photoURL} className="mr-2">
              {chatMeta.host.photoURL
                ? undefined
                : chatMeta.host.displayName[0]}
            </Avatar>
            <div>
              <Typography className="text-white mr-2" fontSize="0.8rem">
                {chatMeta.host.displayName}
              </Typography>
              <Typography className="text-gray-400 text-xs text-center">
                trusted
              </Typography>
            </div>
            <NationFlag sizes={30} nation={chatMeta.host.localLang} />
          </HostProfileWrap>
        </Header>
        <Main>
          <Typography className="mr-2 mb-2 text-gray-400">
            Description :{' '}
          </Typography>
          <Typography>
            {chatMeta.description ?? 'No Description for this topic'}
          </Typography>
        </Main>
        <Footer>
          {chatMeta.reserved.length > 0 && (
            <LookForwardList>
              <StackedAvatars
                urls={chatMeta.reserved.map((x) => x.photoURL)}
                slicer={8}
                lightText
              />
            </LookForwardList>
          )}
          <ActionBox>
            {liveStatus === 'live' && (
              <ActionBtn
                onClick={() => router.push(`/app/seven/live/${chatMeta.id}`)}
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
                  {dy(chatMeta.startTime.toDate()).fromNow()}
                </span>
                <div className="flex justify-center items-center w-full">
                  <ActionBtn onClick={reserveHandler}>
                    {isReservedChat ? 'Cancel' : 'Reserve'}
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

export default DetailViewModal;

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
