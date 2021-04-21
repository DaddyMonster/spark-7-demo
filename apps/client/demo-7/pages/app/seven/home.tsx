import React from 'react';
import { SevenPageType } from '../../../types';

const SevenHome: SevenPageType = () => {
  return <h1>HELO</h1>;
};

/* SevenHome.layout = 'SEVEN_NORMAL_LAYOUT'; */

export const getStaticProps = async () => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};

export default SevenHome;
