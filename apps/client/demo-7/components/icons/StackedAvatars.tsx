import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
interface Props {
  urls: string[];
  overlay?: boolean;
  slicer?: number;
  lightText?: boolean;
}

const StackedAvatars = ({
  urls,
  overlay = false,
  slicer = 5,
  lightText = false,
}: Props) => {
  return (
    <div className="w-full h-full flex items-center">
      <div
        className="relative"
        style={{
          height: 30,
          display: overlay ? 'block' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {urls.slice(0, slicer).map((x, i) => (
          <AbsAvatar src={x} index={i} key={i} $overlay={overlay} />
        ))}
      </div>
      <div className="ml-auto">
        {urls.slice(slicer, urls.length - 1).length > 0 && (
          <Typography className={lightText ? 'text-white' : ''}>{`+ ${
            urls.length - slicer
          }`}</Typography>
        )}
      </div>
    </div>
  );
};

export default StackedAvatars;

const AbsAvatar = styled(Avatar)<{ index: number; $overlay: boolean }>(
  ({ theme, index, $overlay }) => ({
    width: 25,
    height: 25,
    position: $overlay ? 'absolute' : 'relative',
    left: $overlay ? `${20 + index * 20}px` : 0,
    top: $overlay ? 5 : 0,
    marginRight: theme.spacing($overlay ? 0 : 1),
  })
);
