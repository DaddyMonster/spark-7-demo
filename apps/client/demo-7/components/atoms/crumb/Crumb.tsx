import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';

type AppName = 'Seven Talk' | 'Learn';

interface Props {
  appName: AppName;
  title: string;
  subTitle: string;
}

const Crumb = ({ title, appName, subTitle }: Props) => {
  return (
    <div className="w-full pt-8 mb-4">
      <div className="flex mb-2">
        <Typography fontSize="1.3rem" color={grey[800]} className="font-menu">
          {appName + ' | '}
        </Typography>
        <Typography fontSize="1.3rem" className="font-menu ml-2">
          {title}
        </Typography>
      </div>
      <Typography color={grey[600]} className="mb-3">
        {subTitle}
      </Typography>
    </div>
  );
};

export default Crumb;
