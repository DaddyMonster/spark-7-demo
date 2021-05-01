import React from 'react';
import { Nation } from '@hessed/client-module/seven-shared';
import styled from 'styled-components';
import { NationFlag } from '@hessed/ui/web/atom';
import { Avatar } from '@material-ui/core';
interface AvatarWithFlagProps {
  className?: string;
  photoURL: string;
  nation: Nation;
}

export const AvatarWithFlag = ({
  className = '',
  photoURL,
  nation,
}: AvatarWithFlagProps) => {
  return (
    <div className={`relative ${className}`}>
      <Avatar src={photoURL} />
      <FlagWrap>
        <NationFlag nation={nation} size={15} />
      </FlagWrap>
    </div>
  );
};

const FlagWrap = styled.div(({ theme }) => ({
  position: 'absolute',
  bottom: -7,
  right: -7,
}));
