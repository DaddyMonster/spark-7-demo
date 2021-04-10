import {
  Avatar,
  CircularProgress,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { useChatSelection } from '../../../../hooks/chat-selection';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { AiTwotoneTool } from 'react-icons/ai';
import Scrollbar from 'react-perfect-scrollbar';
import scrollIntoView from 'scroll-into-view-if-needed';
import styled from 'styled-components';
import ChatMessage from '../../../../components/chat/ChatMessage';
import ChatUserListItem from '../../../../components/chat/ChatUserListItem';
import { NationFlag } from '../../../../components/flag/NationFlag';
import { useLive } from '../../../../hooks/live';
import { useLiveAudio } from '../../../../hooks/live-audio';
import { useRecogChat } from '../../../../hooks/recog-chat';
import { CustomPageType } from '../../../../types/custom-page';

type Tab = 'user' | 'tools';

const LiveRoom: CustomPageType = () => {
  const [rightView, setrightView] = useState<Tab>('tools');
  const { chatMeta, loading, users, messages, me, liveUid } = useLive();

  const { switchRole, userVolumeMap } = useLiveAudio({
    chatMetaId: chatMeta?.id,
    isHost: chatMeta?.hostId === me?.uid,
    ready: !loading,
    liveUid,
  });

  const { msgStatus, initRecognition, stopRecognition, recogOn } = useRecogChat(
    {
      lang: me?.localLang,
      metaId: chatMeta?.id,
      user: me,
    }
  );

  const {
    addChatToBag,
    selectedChatMsg,
    setSelectedChatMsg,
    translation,
  } = useChatSelection({ me, roomLang: chatMeta?.lang });

  const roleRef = useRef(null);
  useEffect(() => {
    if (loading) {
      return;
    }
    manageRecog();
  }, [chatMeta?.liveUsers, roleRef, loading, me]);

  const manageRecog = () => {
    const meInChat = chatMeta.liveUsers.find((x) => x.uid === me.uid);
    if (!meInChat) {
      // This Won't Happen!! for typeing purpos
      return;
    }
    const { role } = meInChat;
    if (role !== roleRef.current) {
      if (role === 'host' && !recogOn) {
        initRecognition();
      } else {
        stopRecognition();
      }
      roleRef.current = role;
    }
  };

  useEffect(() => {
    console.log(userVolumeMap);
  }, [userVolumeMap]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      scrollIntoView(bottomRef.current, {
        scrollMode: 'always',
        behavior: 'smooth',
      });
    }
  }, [messages, loading]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ height: 600, width: '100%', marginTop: 30 }}>
      <Tool
        whileHover={{
          rotate: [-5, 0, 5, 0, 5, 0],
          scale: 1.05,
        }}
      >
        <AiTwotoneTool />
      </Tool>
      <Grid container>
        <Grid item xs={7}>
          <LeftPaper>
            <LeftHeader>
              <div
                className="inline-block"
                style={{ transform: 'translateX(-35px)', borderRadius: 10 }}
              >
                <div className="flex items-center px-3 py-1 bg-primary">
                  <NationFlag nation={chatMeta.lang} sizes={40} />
                  <Topic className="ml-2">{chatMeta.topic}</Topic>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <HostProfileWrap>
                  <Avatar src={chatMeta.host.photoURL} className="mr-2">
                    {chatMeta.host.photoURL
                      ? undefined
                      : chatMeta.host.displayName[0]}
                  </Avatar>
                  <div className="mr-2">
                    <Typography className=" mr-2" fontSize="1rem">
                      {chatMeta.host.displayName}
                    </Typography>
                    <Typography className="text-gray-400 text-xs text-center">
                      trusted
                    </Typography>
                  </div>
                  <NationFlag sizes={30} nation={chatMeta.host.localLang} />
                </HostProfileWrap>
              </div>
            </LeftHeader>

            <Scrollbar style={{ height: 420 }} className="px-3">
              {messages.map((msg, index) => {
                const { message, id, user } = msg;
                return (
                  <ChatMessage
                    message={message}
                    clientUid={me.uid}
                    isSpeaking={false}
                    messageId={id}
                    key={id}
                    {...user}
                    onClick={() => setSelectedChatMsg(msg)}
                    prevUid={index > 0 ? messages[index - 1].user.uid : null}
                  />
                );
              })}

              <div ref={bottomRef} />
            </Scrollbar>
          </LeftPaper>
        </Grid>
        <Grid item xs={5}>
          <RightPaper>
            <Tabs
              variant="fullWidth"
              value={rightView}
              onChange={(_, val) => setrightView(val)}
            >
              <Tab label="View User" value="user" />
              <Tab label="View Tools" value="tools" />
            </Tabs>
            {rightView === 'user' && (
              <RightViewWrap>
                {users.map((x) => (
                  <ChatUserListItem
                    {...x}
                    volume={userVolumeMap.get(x.liveUid) ?? 0}
                    key={x.uid}
                  />
                ))}
              </RightViewWrap>
            )}
          </RightPaper>
        </Grid>
      </Grid>
    </div>
  );
};

LiveRoom.layout = 'LIVE_ROOM_LAYOUT';

export default LiveRoom;

const LeftPaper = styled(Paper)(({ theme }) => ({
  height: 600,
  margin: theme.spacing(2),
}));

const LeftHeader = styled.div(({ theme }) => ({
  padding: theme.spacing(0, 0, 2),
}));

const Topic = styled(Typography)(({ theme }) => ({
  color: '#fff',
  display: 'inline-block',
  padding: theme.spacing(2),
  borderRadius: '0 15px 15px 0',
  fontSize: '1.2rem',
}));

const RightPaper = styled(Paper)(({ theme }) => ({
  height: 600,
  margin: theme.spacing(2),
}));

const MotionAvatar = motion(Avatar);
const Tool = styled(MotionAvatar)(({ theme }) => ({
  position: 'fixed',
  bottom: 50,
  right: 50,
  width: 70,
  height: 70,
  background: theme.palette.primary.main,
  boxShadow: theme.shadows[7],
  cursor: 'pointer',
  '& svg': {
    fill: '#fff',
    fontSize: '2rem',
  },
}));

const HostProfileWrap = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(1),
  padding: theme.spacing(1.5, 3),
}));

const RightViewWrap = styled.div(({ theme }) => ({
  height: 'calc(600px - 48px)',
  width: '100%',
  padding: theme.spacing(1),
}));
