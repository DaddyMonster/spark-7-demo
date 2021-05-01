import React from 'react';
import { SmModalBase, SmModalBaseProps } from '../SmModalBase';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Scroll from 'react-perfect-scrollbar';
import { LinedTypo } from '@hessed/ui/web/atom';
export interface DetailInfoModalProps extends SmModalBaseProps {
  header: string;
  subHeader: string;
  children: React.ReactNode;
  HeaderItem?: React.ComponentType;
  FooterRenderer?: React.ComponentType;
}

const FOOTER_HEIGHT = 60;

export const DetailInfoModal = ({
  children,
  header,
  subHeader,
  HeaderItem,
  FooterRenderer,
  ...props
}: DetailInfoModalProps) => {
  return (
    <SmModalBase {...props}>
      <HeaderWrap>
        <LinedTypo className="font-guide">{header}</LinedTypo>
        <Typography
          fontSize="0.8"
          sx={{ color: grey[700] }}
          className="ml-auto"
        >
          {subHeader}
        </Typography>
        {HeaderItem && <HeaderItem />}
      </HeaderWrap>
      <Wrapper>
        <Scroll>
          <ChildWrap>{children}</ChildWrap>
        </Scroll>
        {FooterRenderer && (
          <Footer>
            <FooterRenderer />
          </Footer>
        )}
      </Wrapper>
    </SmModalBase>
  );
};

const Wrapper = styled.div(({ theme }) => ({
  padding: theme.spacing(2.5),
  paddingBottom: FOOTER_HEIGHT,
  position: 'relative',
}));

const HeaderWrap = styled.div(({ theme }) => ({
  background: theme.palette.secondary.main,
  borderRadius: '0 0 0 50%',
  width: `calc(100% + ${theme.spacing(4)})`,
  display: 'flex',
  minHeight: 200,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(4, 3, 3, 7),
  boxShadow: theme.shadows[2],
  transform: `translateX(-${theme.spacing(4)})`,
  [`& ${LinedTypo}`]: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
}));
const ChildWrap = styled.div(({ theme }) => ({
  maxHeight: 300,
  minHeight: 150,
}));

const Footer = styled.div(({ theme }) => ({
  boxShadow: theme.shadows[3],
  height: FOOTER_HEIGHT,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
}));
