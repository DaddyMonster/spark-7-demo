import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  motion,
  useTransform,
  useViewportScroll,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { LogAppPageType } from '../types';

export const Index: LogAppPageType = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, (yProg) => {
    const scaleVal = 1 + yProg * 5;
    return scaleVal;
  });
  const y = useTransform(scrollYProgress, (yProg) => yProg * 100 + '%');
  const opacity = useTransform(scrollYProgress, (yProg) =>
    Math.max(1 - yProg, 0.3)
  );

  return (
    <div ref={rootRef}>
      <Jumbo>
        <Bg
          style={{ scale, y, opacity }}
          layoutId="onam"
          initial={{ scale: 1, y: 0, opacity: 1 }}
        />
        <Container maxWidth="md" className="relative">
          <Grid container>
            <Grid item xs={12} md={6}>
              <motion.div layoutId="write-onam">
                <Image
                  src="/svg/blog-index.svg"
                  height={300}
                  width="auto"
                  className="mr-3"
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="flex flex-col justify-center h-full">
                <MotionTypo
                  className="font-logo mb-6 text-center"
                  fontWeight={900}
                  fontSize="2rem"
                  layoutId="heading"
                >
                  Discover Daniel Hwang and <br /> Others Tech Logs!
                  <br />
                </MotionTypo>
                <div className="mx-auto flex items-center">
                  <MotionTypo
                    fontSize="1.2rem"
                    className="font-guide mr-3"
                    layoutId="sub-heading"
                  >
                    Wanna write?
                  </MotionTypo>

                  <MotionButton variant="contained" layoutId="join-btn">
                    Join
                  </MotionButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Jumbo>
      <div className="w-full flex flex-col items-center relative mt-10 py-3">
        <Typography fontSize="2rem" className="font-guide mb-5">
          Who created this App?
        </Typography>
        <RootCard>
          <Avatar
            src="https://material-ui.com/static/images/avatar/2.jpg"
            sx={{ height: '100%', width: 80 }}
            className="mr-3"
          />
          <div className="flex flex-col justify-center">
            <Typography fontSize="1.2rem" className="font-guide pt-4">
              Daniel Hwang
            </Typography>
            <Typography
              fontSize="0.9rem"
              className="font-guide text-gray-600 mb-3"
            >
              Full Stack Developer
            </Typography>
            <div className="ml-auto w-full">
              <MotionButton
                variant="outlined"
                sx={{ fontSize: '0.8rem', mr: 1 }}
              >
                View Stacks
              </MotionButton>
              <MotionButton sx={{ fontSize: '0.8rem' }}>
                Send Message
              </MotionButton>
            </div>
          </div>
        </RootCard>
      </div>
      <div style={{ height: 3000 }}></div>
    </div>
  );
};

Index.layout = 'ANIMATED_LAYOUT';

export default Index;
const MotionTypo = motion(Typography);
const MotionButton = motion(Button);
const Jumbo = styled.div(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 10),
  position: 'relative',
  marginBottom: theme.spacing(3),
}));

export const Bg = styled(motion.div)(({ theme }) => ({
  content: "''",
  width: '100%',
  height: 800,
  position: 'fixed',
  top: -300,
  left: 0,
  background: 'url(/svg/index-bg.svg)',
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom center',
  transformOrigin: 'center',
}));

const RootCard = styled(motion(Card))(({ theme }) => ({
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2, 4),
  borderRadius: 15,
  display: 'flex',
  alignItems: 'center',
}));
