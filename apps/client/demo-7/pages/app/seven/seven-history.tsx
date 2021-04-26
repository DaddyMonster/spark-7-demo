import { Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import React from 'react';

const SevenHistory = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Typography>This page is currently not available</Typography>
    </div>
  );
};

export default SevenHistory;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};
