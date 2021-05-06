import { Paper } from '@material-ui/core';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { Bg } from '../../pages';
import AuthFormBody, { AuthFormBodyProps } from './AuthFormBody';
import AuthFormHead from './AuthFormHead';

export type AuthPageLabel = 'LOGIN' | 'REGISTER' | 'RESET PASSWORD';

interface AuthFormLayoutProps extends AuthFormBodyProps {
  leftHead: boolean;
  children: React.ReactNode;
}

const AuthFormLayout = ({
  leftHead,
  children,
  ...bodyProps
}: AuthFormLayoutProps) => {
  return (
    <Root exit={{ opacity: 0 }}>
      <Bg layoutId="onam" animate={{ scale: 5, transition: { duration: 1 } }} />
      <RootPaper>
        <AuthFormHead />
        <AuthFormBody {...bodyProps}>{children}</AuthFormBody>
      </RootPaper>
    </Root>
  );
};

export default AuthFormLayout;

const Root = styled(motion.div)(({ theme }) => ({
  width: '100%',
  minHeight: 800,
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const RootPaper = styled(motion(Paper))(({ theme }) => ({
  width: 800,
  minHeight: 400,
  borderRadius: 15,
  boxShadow: theme.shadows[6],
  position: 'relative',
  display: 'flex',
}));
