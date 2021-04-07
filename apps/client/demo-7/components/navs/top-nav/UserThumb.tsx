import React from 'react';
import styled from 'styled-components';
import { TOP_NAV_HEIGHT } from '../../../constants/layout-sizes';
import { NationFlag } from '../../flag/NationFlag';
import { Avatar, Typography } from '@material-ui/core';
import { Typo } from '../../typos/Typo';
import { UserDetail } from '../../../model/user-detail';

export const UserThumb = ({
  photoURL,
  localLang,
  learningLang,
  email,
  displayName,
}: UserDetail) => {
  return (
    <Root>
      <div className="flex flex-col items-center justify-center px-1 pb-2">
        <Typography fontSize="0.5rem">Native</Typography>
        <NationFlag nation={localLang} />
      </div>
      {learningLang && (
        <div className="flex flex-col items-center justify-center px-1 mr-10 pb-2">
          <Typography fontSize="0.5rem">Learning</Typography>
          <NationFlag nation={learningLang[0]} />
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center mr-3">
        <Avatar src={photoURL}>
          {photoURL ? undefined : email ? email[0] : ''}
        </Avatar>
      </div>
      <div className="h-full flex flex-col justify-center">
        <Typo noWrap>{displayName}</Typo>
      </div>
    </Root>
  );
};

const Root = styled.div(({ theme }) => ({
  height: TOP_NAV_HEIGHT,
  display: 'flex',
}));
