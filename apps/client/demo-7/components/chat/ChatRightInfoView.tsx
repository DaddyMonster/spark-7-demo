import { ChatRoom } from '@hessed/client-module/seven-chat';
import { Theme, Typography, useMediaQuery } from '@material-ui/core';
import { Translate } from 'next-translate';
import React from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';
import { CHAT_ROOT_HEADER_HEIGHT } from './ChatRightSideContent';
import { ChatTools, CHAT_TOOL_HEIGHT } from './ChatTools';

interface ChatRightInfoViewProps {
  roomInfo: ChatRoom;
  t: Translate;
}

export const ChatRightInfoView = ({ roomInfo, t }: ChatRightInfoViewProps) => {
  const upLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  return (
    <>
      <InfoWrap upLg={upLg}>
        <Scrollbar>
          <Typography
            fontSize="1.3rem"
            className="text-gray-400 font-pretty mb-2"
          >
            Topic
          </Typography>
          <Typography className="font-pretty mb-5 pl-3">
            {/* {roomInfo.topic} */}Et duis est nulla est Lorem culpa veniam
            Incididunt anim elit esse consequat nulla dolore ad. Lorem.
          </Typography>
          <Typography
            fontSize="1rem"
            className="text-gray-400 font-pretty mb-2"
          >
            Description
          </Typography>
          <Typography
            className="font-pretty text-sm text-gray-600 pl-3"
            fontSize="0.8rem"
          >
            {/* {roomInfo.description} */}
            Do pariatur mollit mollit esse laboris velit labore in proident aute
            duis consectetur commodo. Sunt incididunt eiusmod mollit amet ex.
            Mollit aute pariatur minim fugiat sit irure amet culpa nulla sint
            eiusmod commodo. Veniam tempor excepteur ipsum labore culpa ea
            dolore aliquip. Reprehenderit in anim laboris minim est veniam
            aliquip voluptate exercitation et occaecat id voluptate. Labore
            eiusmod elit fugiat laboris id deserunt consectetur culpa elit.
          </Typography>
        </Scrollbar>
      </InfoWrap>
      {upLg && <ChatTools t={t} />}
    </>
  );
};

const InfoWrap = styled.div<{ upLg: boolean }>(({ theme, upLg }) => ({
  width: '100%',
  height: `calc(100% - ${
    (upLg ? CHAT_TOOL_HEIGHT : 0) + CHAT_ROOT_HEADER_HEIGHT
  }px)`,
  padding: theme.spacing(2.5, 0),
}));
