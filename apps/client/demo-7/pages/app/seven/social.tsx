import React, { useMemo } from 'react';
import { AppBaseContainer } from '@hessed/ui/web/layout';
import useTranslation from 'next-translate/useTranslation';
import { Grid, Hidden, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useListCacheStore } from '@hessed/hook/store';
import {
  SevenUserInfo,
  UserQuery,
  useUserCacheStore,
} from '@hessed/client-module/seven-auth';
import { DocSnap } from '@hessed/client-lib/firebase';
import { UserListCard } from '@hessed/ui/web/list';
import { BoxedTypo } from '@hessed/ui/web/atom';

const Social = () => {
  const { t } = useTranslation('seven-social');

  const { list: top10ListRef } = useListCacheStore<
    DocSnap<SevenUserInfo>,
    UserQuery,
    null
  >({
    fetchArgs: null,
    store: useUserCacheStore,
    key: 'top-rated',
    limit: 10,
    ready: true,
  });

  const top10List = useMemo(() => top10ListRef.map((x) => x.data()), [
    top10ListRef,
  ]);

  return (
    <AppBaseContainer
      title={t('page-title')}
      subTitle={t('page-subtitle')}
      appName="Seven"
      hideCrumbOnDownSm={false}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <SearchSectionPaper>
            <Header>{t('search-user-title')}</Header>
          </SearchSectionPaper>
        </Grid>
        <Hidden lgDown>
          <Grid item lg={4}>
            <RankedPaper>
              <Header>{t('ranked-hosts')}</Header>
              {top10List.map((x) => (
                <UserListCard
                  displayName={x.displayName}
                  timeStampInfo={x.lastLogged.toDate()}
                  uid={x.uid}
                  userSubtitle={x.reputation}
                  onClick={(id) => console.log('USER CLICKED', id)}
                  $rootStyle={(theme) => ({
                    boxShadow: theme.shadows[3],
                  })}
                />
              ))}
            </RankedPaper>
          </Grid>
        </Hidden>
      </Grid>
    </AppBaseContainer>
  );
};

export default Social;

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};
const SearchSectionPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 550,
  padding: theme.spacing(1.5, 2),
  borderRadius: 10,
  boxShadow: theme.shadows[3],
}));

const RankedPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 550,
  borderRadius: 10,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(1.5, 2),
}));

const Header = styled(BoxedTypo)(({ theme }) => ({
  transform: 'rotate(-2deg) translate(-20px , -15px)',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    transform: 'none',
  },
}));
