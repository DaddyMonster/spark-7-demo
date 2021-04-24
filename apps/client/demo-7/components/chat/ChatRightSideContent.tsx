import React from 'react';

export type ChatRightViewMode = 'default' | 'learn';

interface ChatRightSideContentProps {
  viewMode: ChatRightViewMode;
}

export const ChatRightSideContent = ({
  viewMode,
}: ChatRightSideContentProps) => {
  return <div></div>;
};
