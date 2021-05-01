import { Avatar, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  urls: string[];
  overlay?: boolean;
  slicer?: number;
  lightText?: boolean;
}

export const StackedAvatars = ({
  urls,
  overlay = false,
  slicer = 5,
  lightText = false,
}: Props) => {
  const slicedURL = useMemo(() => urls.slice(0, slicer), [urls, slicer]);

  return (
    <Root>
      <Wrapper $overlay={overlay}>
        {slicedURL.map((x, i) => {
          return (
            <>
              <AbsAvatar $overlay={overlay} key={i} src={x} index={i}>
                {x.length <= 1 && x}
              </AbsAvatar>
              {i === slicedURL.length - 1 && i >= slicer && (
                <MoreNumberDisplay lightText={lightText}>
                  {`+ ${urls.length - slicer}`}
                </MoreNumberDisplay>
              )}
            </>
          );
        })}
      </Wrapper>
    </Root>
  );
};

const Root = styled.div(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
}));

const Wrapper = styled.div<{ $overlay: boolean }>(({ theme, $overlay }) => ({
  display: $overlay ? 'block' : 'flex',
  minHeight: 30,
  position: 'relative',
}));

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

const MoreNumberDisplay = styled(Typography)<{ lightText: boolean }>(
  ({ theme, lightText }) => ({
    color: lightText ? '#fff' : theme.palette.black.main,
  })
);
