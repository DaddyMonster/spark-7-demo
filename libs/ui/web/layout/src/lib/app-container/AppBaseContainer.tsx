import React from 'react';
import { CrumbProps, Crumb } from '@hessed/ui/web/atom';
import { Container, Hidden } from '@material-ui/core';
import styled from 'styled-components';

interface AppBaseContainer extends CrumbProps {
  hideCrumbOnDownSm?: boolean;
  children: React.ReactNode;
}

export const AppBaseContainer = ({
  appName,
  subTitle,
  title,
  hideCrumbOnDownSm = true,
  children,
}: AppBaseContainer) => {
  return (
    <Root>
      <Hidden smDown={hideCrumbOnDownSm}>
        <Crumb appName={appName} subTitle={subTitle} title={title} />
      </Hidden>
      <Container maxWidth="lg">{children}</Container>
    </Root>
  );
};

const Root = styled(Container).attrs({ maxWidth: 'lg' })(({ theme }) => ({
  padding: theme.spacing(0, 4),
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));
