import { Typography, useMediaQuery, Theme, Hidden } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import styled from 'styled-components';
import React from 'react';

export interface CrumbProps {
  appName: string;
  title: string;
  subTitle: string;
}

export const Crumb = ({ title, appName, subTitle }: CrumbProps) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const fs = mdDown ? '1rem' : '1.3rem';
  return (
    <CrumbRoot className="w-full pt-8 mb-4">
      <div className="flex mb-2">
        <Typography fontSize={fs} color={grey[800]} className="font-menu mr-2">
          {appName} |
        </Typography>

        <Typography fontSize={fs} className="font-menu">
          {title}
        </Typography>
      </div>
      <Typography
        fontSize={mdDown ? '0.8rem' : '1rem'}
        color={grey[600]}
        className="mb-3"
      >
        {subTitle}
      </Typography>
    </CrumbRoot>
  );
};

const CrumbRoot = styled.div(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(4),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 4, 0),
    marginBottom: theme.spacing(1),
  },
}));
