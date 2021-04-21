import React, { useEffect } from 'react';
import { useSideStore } from '@hessed/hook/sidebar';
import { SevenPageType } from '../../../types';

const SevenHome: SevenPageType = () => {
  const setMiniPage = useSideStore((store) => store.setMiniPage);
  useEffect(() => {
    setMiniPage(true);
  }, []);

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
