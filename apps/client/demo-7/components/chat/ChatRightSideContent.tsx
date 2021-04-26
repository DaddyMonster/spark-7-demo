import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ChatRoom } from '@hessed/client-module/seven-chat';
import { SimpleLoading } from '@hessed/ui/web/atom';
import { ChatRightInfoView } from './ChatRightInfoView';
import { ChatRightLearnView } from './ChatRightLearnView';
import useTranslation from 'next-translate/useTranslation';
export type ChatRightViewMode = 'default' | 'learn';

export const CHAT_ROOT_HEADER_HEIGHT = 48;

interface ChatRightSideContentProps {
  viewMode: ChatRightViewMode;
  onViewModeChange: (mode: ChatRightViewMode) => void;
  roomInfo: ChatRoom | null;
}

export const ChatRightSideContent = ({
  viewMode,
  onViewModeChange,
  roomInfo,
}: ChatRightSideContentProps) => {
  if (!roomInfo) {
    return <SimpleLoading />;
  }
  const { t } = useTranslation('chat-room-info');
  return (
    <Root>
      <Tabs
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        value={viewMode}
        onChange={(_, mode) => onViewModeChange(mode)}
      >
        <Tab label="Room Info" value="default" />
        <Tab label="Learn mode" value="learn" />
      </Tabs>
      <ContentWrap>
        {viewMode === 'default' && (
          <ChatRightInfoView roomInfo={roomInfo} t={t} />
        )}
        {viewMode === 'learn' && <ChatRightLearnView />}
      </ContentWrap>
    </Root>
  );
};

const Root = styled.div(({ theme }) => ({
  width: 'calc(100% - 2px)',
  height: '100%',
  marginLeft: 2,
  boxShadow: theme.shadows[3],
}));

const ContentWrap = styled.div(({ theme }) => ({
  width: '100%',
  height: `calc(100vh - ${CHAT_ROOT_HEADER_HEIGHT}px)`,
  padding: theme.spacing(2),
}));
