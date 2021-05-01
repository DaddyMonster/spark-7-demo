import { Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { SEVEN_TOP_NAV_HEIGHT } from '@hessed/client-module/seven-shared';
import React from 'react';

const SearchTopic = () => {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: `calc(100vh - ${SEVEN_TOP_NAV_HEIGHT}px)` }}
    >
      <Typography>This page is currently not available</Typography>
    </div>
  );
};

export default SearchTopic;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};
