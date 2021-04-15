import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiWebNavsProps {}

const StyledUiWebNavs = styled.div`
  color: pink;
`;

export function UiWebNavs(props: UiWebNavsProps) {
  return (
    <StyledUiWebNavs>
      <h1>Welcome to ui-web-navs!</h1>
    </StyledUiWebNavs>
  );
}

export default UiWebNavs;
