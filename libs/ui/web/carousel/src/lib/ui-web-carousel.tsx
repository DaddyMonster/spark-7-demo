import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiWebCarouselProps {}

const StyledUiWebCarousel = styled.div`
  color: pink;
`;

export function UiWebCarousel(props: UiWebCarouselProps) {
  return (
    <StyledUiWebCarousel>
      <h1>Welcome to ui-web-carousel!</h1>
    </StyledUiWebCarousel>
  );
}

export default UiWebCarousel;
