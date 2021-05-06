import styled from 'styled-components';
import React from 'react';
import { useHiddenNav } from '../hooks/top-nav/useTopNavHiddenStore';
import { LogAppPageType } from '../types';
import { Button, Grid, Paper, Typography, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { Bg } from '.';
import { grey } from '@material-ui/core/colors';
import Image from 'next/image';
import Color from 'color';
import { LogoBox } from '@hessed/ui/web/navs';
import { FormProvider } from '@hessed/ui/shared';
import { useLogin, initLoginValue, loginValidationSchema } from '../hooks/auth';
import { FormTextField } from '@hessed/ui/web/form';
const Login: LogAppPageType = () => {
  useHiddenNav(true);
  const theme = useTheme();
  const { onSubmit } = useLogin();
  return (
    <Root exit={{ opacity: 0 }}>
      <Bg layoutId="onam" animate={{ scale: 5, transition: { duration: 1 } }} />
      <RootPaper layoutId="login-btn">
        <Head>
          <Image
            alt="logo-7"
            src="/logo/log-app-head.svg"
            width="230"
            height="80px"
            className="mb-10"
          />
          <motion.div layoutId="write-onam">
            <Image
              src="/svg/blog-index.svg"
              height={200}
              width="auto"
              className="mt-auto"
            />
          </motion.div>
        </Head>
        <Body>
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
            LOGIN
          </MotionTypo>
          <div className="flex items-center">
            <MotionTypo
              fontSize="0.8rem"
              className="font-guide text-gray-600 mr-1"
              layoutId="sub-heading"
            >
              Not a member?
            </MotionTypo>
            <Button className="px-1">Join</Button>
          </div>
          <FormProvider
            validationSchema={loginValidationSchema}
            initialValues={initLoginValue}
            onSubmit={onSubmit}
          >
            {({ submitForm }) => (
              <>
                <FormTextField label="E-mail" name="email" />
                <FormTextField label="Password" name="password" />
              </>
            )}
          </FormProvider>
        </Body>
      </RootPaper>
    </Root>
  );
};
Login.layout = 'ANIMATED_LAYOUT';
export default Login;

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

const Head = styled.div(({ theme }) => ({
  flex: '0 0 300px',
  minHeight: 400,
  background: Color(theme.palette.secondary.main).whiten(0.05).hex(),
  borderRadius: '15px 0 0 15px',
  borderRight: `2px solid ${grey[300]}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  flexDirection: 'column',
  padding: theme.spacing(0, 3),
}));

const Body = styled.div(({ theme }) => ({
  padding: theme.spacing(6, 6, 4),
  width: '100%',
}));

const MotionTypo = motion(Typography);
/*      */
