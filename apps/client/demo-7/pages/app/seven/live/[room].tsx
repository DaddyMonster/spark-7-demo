import {
  Avatar,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Hidden,
  Paper,
  Popper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import VolumePopper from '../../../../components/vol-pop/VolumePopper';
import { useVolumeControl } from '../../../../hooks/volume-control';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import scrollIntoView from 'scroll-into-view-if-needed';
import styled from 'styled-components';
import ChatMessage from '../../../../components/chat/ChatMessage';
import ChatToolItem from '../../../../components/chat/ChatToolItem';
import ChatUserListItem from '../../../../components/chat/ChatUserListItem';
import { NationFlag } from '../../../../components/flag/NationFlag';
import { TOP_NAV_HEIGHT } from '../../../../constants/layout-sizes';
import { liveRoomIconMap } from '../../../../constants/live-room-icon-list';
import { useChatSelection } from '../../../../hooks/chat-selection';
import { useLive } from '../../../../hooks/live';
import { useLiveAudio } from '../../../../hooks/live-audio';
import { useRecogChat } from '../../../../hooks/recog-chat';
import { CustomPageType } from '../../../../types/custom-page';
import ChatUtilModalBase, {
  PopState,
} from '../../../../components/modal/ChatUtilModalBase';

type Tab = 'user' | 'tools';

const LiveRoom: CustomPageType = () => {
  const [rightView, setrightView] = useState<Tab>('tools');
  const { chatMeta, loading, users, messages, me, liveUid } = useLive();
  const selfInLive = useMemo(() => {
    if (!users || !me) {
      return null;
    }
    return users.find((x) => x.uid === me.uid);
  }, [users, me]);
  const { switchRole, userVolumeMap, setOverallVolume } = useLiveAudio({
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

  const [popOpen, setpopOpen] = useState<PopState>('closed');
  const handlePopState = (popState: PopState) => {
    setpopOpen(popOpen === popState ? 'closed' : popState);
  };
  const [handsUp, sethandsUp] = useState(false);

  const handleHandsUp = () => {
    if (selfInLive.role === 'host') {
      return;
    }
    sethandsUp(handsUp ? false : true);
    // HANDS UP REQUEST HANDLER
  };

  const handleGiveupMic = () => {
    if (selfInLive.role === 'host') {
      alert('Host can not give up mic');
      return;
    }
    switchRole('audience');
  };

  const [{ anchor }, { setAnchor, setVolume }] = useVolumeControl({
    localVolumeSetter: (val) => setOverallVolume(val),
  });

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Root>
      <ChatUtilModalBase
        onClose={() => setpopOpen('closed')}
        popState={popOpen}
        userVolumeMap={userVolumeMap}
        users={users}
      />
      <RootGrid>
        <Grid item xs={12} md={7}>
          <LeftPaper>
            <LeftHeader>
              <TopicWrapper>
                <TopicInner>
                  <NationFlag nation={chatMeta.lang} sizes={40} />
                  <Topic className="ml-2">{chatMeta.topic}</Topic>
                </TopicInner>
              </TopicWrapper>
              <Hidden mdDown>
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
              </Hidden>
            </LeftHeader>

            <Scrollbar
              style={{
                display: 'flex',
                position: 'relative',
                minHeight: 400,
              }}
              className="px-3"
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              >
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
              </div>
            </Scrollbar>
            <div className="mt-auto">
              <Divider />
              <IconBox>
                <ChatToolItem
                  {...liveRoomIconMap.users}
                  active={popOpen === 'users'}
                  onClick={() => handlePopState('users')}
                />
                <ChatToolItem
                  {...liveRoomIconMap.tools}
                  active={popOpen === 'tools'}
                  onClick={() => handlePopState('tools')}
                />
                <ChatToolItem
                  {...liveRoomIconMap['hands-up']}
                  active={handsUp}
                  onClick={handleHandsUp}
                />
                <ChatToolItem
                  {...liveRoomIconMap['give-up-mic']}
                  active={selfInLive?.role === 'host'}
                  onClick={handleGiveupMic}
                />
                <ChatToolItem
                  {...liveRoomIconMap.volume}
                  active={Boolean(anchor)}
                  onClick={setAnchor}
                />
                <VolumePopper anchor={anchor} setVolume={setVolume} />
              </IconBox>
            </div>
          </LeftPaper>
        </Grid>
        <Hidden mdDown>
          <Grid item md={5}>
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
        </Hidden>
      </RootGrid>
    </Root>
  );
};

LiveRoom.layout = 'LIVE_ROOM_LAYOUT';

export default LiveRoom;

const Root = styled.div(({ theme }) => ({
  minHeight: 600,
  height: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
  },
}));

const RootGrid = styled(Grid).attrs({ container: true })(({ theme }) => ({
  maxWidth: theme.breakpoints.width('lg'),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4),
  },
}));

const LeftPaper = styled(Paper)(({ theme }) => ({
  minHeight: 600,
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    height: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
    margin: 0,
    width: '100vw',
  },
}));

const LeftHeader = styled.div(({ theme }) => ({
  padding: theme.spacing(0, 0, 2),
}));

const TopicWrapper = styled.div(({ theme }) => ({
  transform: 'translateX(-35px)',
  borderRadius: 10,
  display: 'inline-block',
  [theme.breakpoints.down('md')]: {
    transform: 'none',
  },
}));

const TopicInner = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.8, 2.5),
  background: theme.palette.primary.main,
  boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.6)',
}));

const Topic = styled(Typography)(({ theme }) => ({
  color: '#fff',
  display: 'inline-block',
  padding: theme.spacing(2),
  borderRadius: 10,
  fontSize: '1.2rem',
}));

const RightPaper = styled(Paper)(({ theme }) => ({
  height: 600,
  margin: theme.spacing(2),
}));

const MotionAvatar = motion(Avatar);

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

const IconBox = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
}));

/* const Tool = styled(MotionAvatar)(({ theme }) => ({
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
})); */

/* <Tool
        whileHover={{
          rotate: [-5, 0, 5, 0, 5, 0],
          scale: 1.05,
        }}
      >
        <AiTwotoneTool />
      </Tool> */
