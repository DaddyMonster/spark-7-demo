import { Button, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { AuthPageLabel } from './AuthFormLayout';

export interface AuthFormBodyProps {
  children: React.ReactNode;
  pageLabel: AuthPageLabel;
  subHeaderLabel: string;
  subHeaderBtnLabel: string;
  onSubHeaderBtnClick: () => void;
}

const AuthFormBody = ({
  children,
  pageLabel,
  onSubHeaderBtnClick,
  subHeaderBtnLabel,
  subHeaderLabel,
}: AuthFormBodyProps) => {
  const theme = useTheme();
  return (
    <Body layoutId="auth-body">
      <MotionTypo
        className="font-guide mb-2"
        fontWeight={900}
        fontSize="2.3rem"
        layoutId="heading"
        sx={{
          color: theme.palette.primary.main,
          textShadow: '2px 2px 0px ' + theme.palette.grey[400],
        }}
      >
        {pageLabel}
      </MotionTypo>
      <div className="flex items-center">
        <MotionTypo
          fontSize="0.8rem"
          className="font-guide text-gray-600 mr-1"
          layoutId="sub-heading"
        >
          {subHeaderLabel}
        </MotionTypo>
        <Button className="px-1" onClick={onSubHeaderBtnClick}>
          {subHeaderBtnLabel}
        </Button>
      </div>
      {children}
    </Body>
  );
};

export default AuthFormBody;

const Body = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(6, 6, 4),
  width: '100%',
}));
const MotionTypo = motion(Typography);
