import { Avatar } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';
export type OAuthTypes = 'kakao' | 'google' | 'github';

interface OAuthMap {
  id: OAuthTypes;
  label: string;
  Icon: IconType;
  color: string;
}

const OAuthList: OAuthMap[] = [
  {
    Icon: RiKakaoTalkFill,
    label: '카카오계정 로그인',
    id: 'kakao',
    color: '#ffe812',
  },
  {
    Icon: AiFillGoogleCircle,
    label: '구글계정 로그인',
    color: '#4285F4',
    id: 'google',
  },
  {
    label: '깃헙 계정 로그인',
    color: '#4A154B',
    Icon: AiFillGithub,
    id: 'github',
  },
];

interface OAuthButtonsProps {
  exclude?: OAuthTypes[];
}

const OAuthButtons = ({ exclude }: OAuthButtonsProps) => {
  //MEMO THIS
  const logics: { [key in OAuthTypes]: () => Promise<void> } = {
    github: () => void {},
    google: () => void {},
    kakao: () => void {},
  };

  const onButtonClick = async (id: OAuthTypes) => {
    const handler = logics[id];
    await handler();
  };

  return (
    <Root>
      {OAuthList.map((x) => (
        <OAuthBtn fill={x.color} onClick={() => onButtonClick(x.id)}>
          <x.Icon />
        </OAuthBtn>
      ))}
    </Root>
  );
};

export default OAuthButtons;

const Root = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

const OAuthBtn = styled(Avatar).attrs({
  variant: 'rounded',
})<{ fill: string }>(({ theme, fill }) => ({
  width: 70,
  height: 70,
  background: 'none',
  marginRight: theme.spacing(2),
  cursor: 'pointer',
  '& svg': {
    fill: grey[600],
    fontSize: '2.3rem',
  },
  '&:hover': {
    '& svg': {
      filter: `drop-shadow(2px 2px 0px ${fill})`,
    },
  },
}));
