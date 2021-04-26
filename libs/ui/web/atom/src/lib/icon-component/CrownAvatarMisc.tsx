import { yellow } from '@material-ui/core/colors';
import React from 'react';
import { AiTwotoneCrown } from 'react-icons/ai';
import styled from 'styled-components';

export const CrownAvatarMisc = () => {
  return (
    <Root>
      <AiTwotoneCrown fill={yellow[500]} />
    </Root>
  );
};

const Root = styled.div(({ theme }) => ({
  position: 'absolute',
  top: -3,
  left: -3,
  zIndex: 10,
}));
