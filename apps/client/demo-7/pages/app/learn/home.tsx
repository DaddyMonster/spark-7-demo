import { Typography } from '@material-ui/core';
import React from 'react';
import { CustomPageType } from '../../../types/custom-page';

const LearnHome: CustomPageType = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <Typography className="mb-4">아직 준비가 덜 됬어요</Typography>

      <Typography>Sorry! We're not ready yet</Typography>
    </div>
  );
};

LearnHome.layout = 'APP_LAYOUT';

export default LearnHome;
