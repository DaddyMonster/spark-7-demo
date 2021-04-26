import {
  Chat,
  ChatLiveUser,
  ChatMessage,
  ChatRoom,
} from '@hessed/client-module/seven-chat';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import { useFbSnapItem, useFbSnapLists } from '@hessed/hook/fb-snapshot';
import { useMiniSidebar, useSidebar } from '@hessed/hook/sidebar';
import { SimpleLoading, SimpleChatMessage } from '@hessed/ui/web/atom';
import { ChatLayout } from '@hessed/ui/web/layout';
import { alpha, Hidden, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import Scroll from 'react-perfect-scrollbar';
import styled from 'styled-components';
import { useSevenTimeMsg } from '@hessed/hook/time-worker';
import dy from 'dayjs';
import {
  ChatLeftSideContent,
  ChatRightSideContent,
  ChatRightViewMode,
  CHAT_ROOT_HEADER_HEIGHT,
} from '../../../../components/chat';
import {
  ChatTools,
  CHAT_TOOL_HEIGHT,
} from '../../../../components/chat/ChatTools';
import { useChatSideStore, useChatSideWorker } from '../../../../hooks/chat';
import { grey } from '@material-ui/core/colors';

const LiveRoom = () => {
  useMiniSidebar();
  useChatSideWorker();
  const router = useRouter();
  const { query } = router;
  const [viewMode, setviewMode] = useState<ChatRightViewMode>('default');
  const { t } = useTranslation('chat');
  const chatModel = useMemo(() => {
    if (!query.roomId) {
      return null;
    }
    return new Chat(query.roomId as string);
  }, [query]);

  const fbQuery = useMemo(() => chatModel?.docRef || null, [chatModel]);
  const liveUserRef = useMemo(() => chatModel?.liveUserRef || null, [
    chatModel,
  ]);
  const liveUsersQuery = useMemo(
    () => liveUserRef?.orderBy('joinedAt') || null,
    [liveUserRef]
  );
  const chatMsgQuery = useMemo(
    () => chatModel?.msgRef.orderBy('createdAt') || null,
    [chatModel]
  );

  const [roomInfo, roomInfoErr] = useFbSnapItem<ChatRoom>({ docRef: fbQuery });
  const [users, userErr] = useFbSnapLists<ChatLiveUser>({
    queryRef: liveUsersQuery,
    limit: 1000,
  });
  const [chatMsg, msgErr] = useFbSnapLists<ChatMessage>({
    queryRef: chatMsgQuery,
    limit: 30,
  });

  const { detailSide, userSide, setSide } = useChatSideStore();
  const { toggleSidebar, sideStatus } = useSidebar();
  const { message } = useSevenTimeMsg({
    targetTime: dy(roomInfo?.startTime.toDate()),
  });

  const handleClickMsg = (uid: string) => {
    console.log('Message ' + uid + ' has Clicked');
  };

  if (!roomInfo) {
    return <SimpleLoading />;
  }

  return (
    <ChatLayout
      leftShowCondition={userSide}
      rightShowCondition={detailSide}
      LeftSideContent={() => <ChatLeftSideContent users={users} />}
      RightSideContent={() => (
        <ChatRightSideContent
          viewMode={viewMode}
          onViewModeChange={(mode) => setviewMode(mode)}
          roomInfo={roomInfo}
        />
      )}
      subtractHeight={SEVEN_TOP_NAV_HEIGHT}
    >
      <Root>
        <Header>
          <Typography
            fontSize="0.8rem"
            textAlign="right"
            sx={{ color: grey[600] }}
          >
            {message}
          </Typography>
        </Header>

        <Content>
          <Scroll
            onClick={(e) => {
              if (sideStatus === 'full') {
                toggleSidebar();
              }
              setSide('close-all', e);
            }}
          >
            {chatMsg.map((x, i) => (
              <SimpleChatMessage
                clientUid={x.user.clientUid}
                displayName={x.user.displayName}
                message={x.message}
                messageId={x.id}
                photoURL={x.user.photoURL}
                prevUid={i === 0 ? null : chatMsg[i - 1].user.uid}
                onClick={handleClickMsg}
                uid={x.user.uid}
              />
            ))}
          </Scroll>
        </Content>
        <Hidden lgUp>
          <ChatTools t={t} />
        </Hidden>
      </Root>
    </ChatLayout>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};

export default LiveRoom;

const Header = styled.div(({ theme }) => ({
  width: '100%',
  height: CHAT_ROOT_HEADER_HEIGHT,
  padding: theme.spacing(2, 2.3),
  background: alpha(theme.palette.secondary.main, 0.5),
  position: 'absolute',
  boxShadow: theme.shadows[1],
  left: 0,
  top: 0,
}));
const Root = styled.div(({ theme }) => ({
  width: '100%',
  height: `calc(100vh - ${SEVEN_TOP_NAV_HEIGHT}px)`,
  background: '#fff',
  position: 'relative',
}));

const Content = styled.div(({ theme }) => ({
  paddingTop: CHAT_ROOT_HEADER_HEIGHT,
  height: '100%',
  [theme.breakpoints.down('lg')]: {
    height: `calc(100% - ${CHAT_TOOL_HEIGHT}px)`,
  },
}));
