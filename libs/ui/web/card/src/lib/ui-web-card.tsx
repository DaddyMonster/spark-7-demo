import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiWebCardProps {}

const StyledUiWebCard = styled.div`
  color: pink;
`;

export function UiWebCard(props: UiWebCardProps) {
  return (
    <StyledUiWebCard>
      <h1>Welcome to ui-web-card!</h1>
    </StyledUiWebCard>
  );
}

export default UiWebCard;
