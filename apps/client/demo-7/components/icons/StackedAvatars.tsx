import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
interface Props {
  urls: string[];
}

const StackedAvatars = ({ urls }: Props) => {
  return (
    <div className="w-full h-full flex items-center">
      <div className="relative" style={{ height: 30 }}>
        {urls.slice(0, 5).map((x, i) => (
          <AbsAvatar src={x} index={i} key={i} />
        ))}
      </div>
      <div className="ml-auto">
        {urls.slice(5, urls.length - 1).length > 0 && (
          <Typography>{`+ ${urls.length - 5}`}</Typography>
        )}
      </div>
    </div>
  );
};

export default StackedAvatars;

const AbsAvatar = styled(Avatar)<{ index: number }>(({ theme, index }) => ({
  width: 25,
  height: 25,
  position: 'absolute',
  left: `${20 + index * 20}px`,
  top: 5,
}));
