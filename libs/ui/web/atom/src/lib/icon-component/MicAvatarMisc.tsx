import { green, grey, red } from '@material-ui/core/colors';
import React from 'react';
import { BsMicFill } from 'react-icons/bs';
import styled from 'styled-components';
import { motion } from 'framer-motion';
interface MicAvatarMisc {
  volume: number;
}

export const MicAvatarMisc = ({ volume }: MicAvatarMisc) => {
  const fill = volume > 5 ? red[300] : grey[600];
  const scale = 1 + (volume / 100) * 0.8;
  return (
    <Root initial={{ scale: 1 }} animate={{ scale }}>
      <BsMicFill fill={fill} />
    </Root>
  );
};

const Root = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  bottom: -3,
  right: -3,
  zIndex: 10,
}));
