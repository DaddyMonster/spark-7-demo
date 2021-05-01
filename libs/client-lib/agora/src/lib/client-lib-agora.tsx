import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ClientLibAgoraProps {}

const StyledClientLibAgora = styled.div`
  color: pink;
`;

export function ClientLibAgora(props: ClientLibAgoraProps) {
  return (
    <StyledClientLibAgora>
      <h1>Welcome to client-lib-agora!</h1>
    </StyledClientLibAgora>
  );
}

export default ClientLibAgora;
