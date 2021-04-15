import { Avatar } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
export interface StyledTestProps {
  sz: number;
  url?: string;
}

const _url = 'https://material-ui.com/static/images/avatar/3.jpg';

export const StyledTest = ({ sz, url = _url }: StyledTestProps) => {
  return <StyledAvatar src={url} sz={sz} />;
};

const StyledAvatar = styled(Avatar)<{ sz: number }>(({ theme, sz }) => ({
  width: sz,
  height: sz,
}));
