import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface StorybookSparkProps {}

const StyledStorybookSpark = styled.div`
  color: pink;
`;

export function StorybookSpark(props: StorybookSparkProps) {
  return (
    <StyledStorybookSpark>
      <h1>Welcome to storybook-spark!</h1>
    </StyledStorybookSpark>
  );
}

export default StorybookSpark;
