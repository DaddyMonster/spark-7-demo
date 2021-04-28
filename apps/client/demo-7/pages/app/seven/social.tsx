import React from 'react';

const Social = () => {
  return <div></div>;
};

export default Social;

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};
