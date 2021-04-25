import React from 'react';
import { ChatUser } from '@hessed/client-module/seven-chat';
import styled from 'styled-components';
interface ChatLeftSideContentProps {
  users: ChatUser[];
}

export const ChatLeftSideContent = ({ users }: ChatLeftSideContentProps) => {
  return <Root></Root>;
};

const Root = styled.div(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.default.main,
  boxShadow: theme.shadows[3],
}));
