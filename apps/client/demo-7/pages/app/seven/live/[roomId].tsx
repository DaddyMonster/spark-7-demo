import { Chat, ChatRoom } from '@hessed/client-module/seven-chat';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import { useFbSnapItem } from '@hessed/hook/fb-snapshot';
import { useMiniSidebar } from '@hessed/hook/sidebar';
import { LinedTypo, SimpleLoading } from '@hessed/ui/web/atom';
import { ChatLayout } from '@hessed/ui/web/layout';
import { alpha } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Scroll from 'react-perfect-scrollbar';
import styled from 'styled-components';

const ROOT_HEADER_HEIGHT = 80;

const LiveRoom = () => {
  useMiniSidebar();
  const router = useRouter();
  const { query } = router;

  const fbQuery = useMemo(() => {
    if (!query.roomId) {
      return null;
    }
    return Chat.collection.doc(query.roomId as string);
  }, [query]);

  const [roomInfo, err] = useFbSnapItem<ChatRoom>({ docRef: fbQuery });

  if (!roomInfo) {
    return <SimpleLoading />;
  }

  return (
    <ChatLayout
      LeftSideContent={() => (
        <div className="bg-secondary w-full h-full">
          <h1>LEFT SIDE CONTENT</h1>
        </div>
      )}
      RightSideContent={() => (
        <div className="bg-purple-300 w-full h-full">
          <h1>RIGHT SIDE CONTENT</h1>
        </div>
      )}
      subtractHeight={SEVEN_TOP_NAV_HEIGHT}
    >
      <Root>
        <Header>
          <LinedTypo>{roomInfo.topic}</LinedTypo>
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
  background: alpha(theme.palette.secondary.main, 0.5),
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
