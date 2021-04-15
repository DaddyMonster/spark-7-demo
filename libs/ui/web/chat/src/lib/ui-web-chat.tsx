import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiWebChatProps {}

const StyledUiWebChat = styled.div`
  color: pink;
`;

export function UiWebChat(props: UiWebChatProps) {
  return (
    <StyledUiWebChat>
      <h1>Welcome to ui-web-chat!</h1>
    </StyledUiWebChat>
  );
}

export default UiWebChat;
