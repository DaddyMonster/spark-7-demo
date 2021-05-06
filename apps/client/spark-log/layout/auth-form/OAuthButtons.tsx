import React from 'react';
import styled from 'styled-components';
export type OAuthTypes = 'kakao' | 'naver' | 'google' | 'github';

interface OAuthButtonsProps {
  onOAuthClick: (type: OAuthTypes) => void;
}

const OAuthButtons = ({ onOAuthClick }: OAuthButtonsProps) => {
  return <div></div>;
};

export default OAuthButtons;

const Root = styled.div(({ theme }) => ({}));
