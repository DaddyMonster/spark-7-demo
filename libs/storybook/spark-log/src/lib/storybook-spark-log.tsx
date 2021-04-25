import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface StorybookSparkLogProps {}

const StyledStorybookSparkLog = styled.div`
  color: pink;
`;

export function StorybookSparkLog(props: StorybookSparkLogProps) {
  return (
    <StyledStorybookSparkLog>
      <h1>Welcome to storybook-spark-log!</h1>
    </StyledStorybookSparkLog>
  );
}

export default StorybookSparkLog;
