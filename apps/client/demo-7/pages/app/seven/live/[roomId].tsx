import {
  Chat,
  ChatMessage,
  ChatRoom,
  ChatUser,
} from '@hessed/client-module/seven-chat';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import { useFbSnapItem, useFbSnapLists } from '@hessed/hook/fb-snapshot';
import { useMiniSidebar } from '@hessed/hook/sidebar';
import { LinedTypo, SimpleLoading } from '@hessed/ui/web/atom';
import { ChatLayout } from '@hessed/ui/web/layout';
import { alpha } from '@material-ui/core';
import { ChatLeftSideContent } from '../../../../components/chat';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Scroll from 'react-perfect-scrollbar';
import styled from 'styled-components';

const ROOT_HEADER_HEIGHT = 70;

const LiveRoom = () => {
  useMiniSidebar();
  const router = useRouter();
  const { query } = router;

  const chatModel = useMemo(() => {
    if (!query.roomId) {
      return null;
    }
    return new Chat(query.roomId as string);
  }, [query]);

  const fbQuery = useMemo(() => chatModel?.docRef || null, [chatModel]);
  const liveUsersQuery = useMemo(
    () => chatModel?.liveUserRef.orderBy('joinedAt') || null,
    [chatModel]
  );
  const chatMsgQuery = useMemo(
    () => chatModel?.msgRef.orderBy('createdAt') || null,
    [chatModel]
  );

  const [roomInfo, roomInfoErr] = useFbSnapItem<ChatRoom>({ docRef: fbQuery });
  const [users, userErr] = useFbSnapLists<ChatUser>({
    queryRef: liveUsersQuery,
    limit: 1000,
  });
  const [messages, msgErr] = useFbSnapLists<ChatMessage>({
    queryRef: chatMsgQuery,
    limit: 30,
  });

  if (!roomInfo) {
    return <SimpleLoading />;
  }

  return (
    <ChatLayout
      LeftSideContent={() => <ChatLeftSideContent users={users} />}
      RightSideContent={() => (
        <div className="bg-purple-300 w-full h-full">
          <h1>RIGHT SIDE CONTENT</h1>
        </div>
      )}
      subtractHeight={SEVEN_TOP_NAV_HEIGHT}
    >
      <Root>
        <Header>
          <LinedTypo style={{ fontSize: '1rem' }}>{roomInfo.topic}</LinedTypo>
        </Header>
        <Scroll>
          <Content></Content>
        </Scroll>
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
  height: ROOT_HEADER_HEIGHT,
  background: '#fff',
  boxShadow: theme.shadows[3],
  padding: theme.spacing(1, 1.7),
  position: 'absolute',
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
  paddingTop: ROOT_HEADER_HEIGHT,
  height: '100%',
}));
