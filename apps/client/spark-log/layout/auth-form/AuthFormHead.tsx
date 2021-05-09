import { grey } from '@material-ui/core/colors';
import Color from 'color';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const AuthFormHead = () => {
  return (
    <Head layoutId="auth-head">
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
  );
};

export default AuthFormHead;

const Head = styled(motion.div)(({ theme }) => ({
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
