import React, { useMemo } from 'react';
import { AppBaseContainer } from '@hessed/ui/web/layout';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Divider,
  Grid,
  Hidden,
  Paper,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { useListCacheStore } from '@hessed/hook/store';
import {
  SevenUserInfo,
  UserQuery,
  useUserCacheStore,
} from '@hessed/client-module/seven-auth';
import { DocSnap, useRefToList } from '@hessed/client-lib/firebase';
import { UserListCard } from '@hessed/ui/web/list';
import { BoxedTypo } from '@hessed/ui/web/atom';
import { useSearchUser } from '../../../hooks/useSearchUser';
import { SearchUserForm } from '../../../components/search-user-form/SearchUserForm';
import { RecommandedUser } from '../../../components/user-card/RecommandedUser';

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

  const { onSubmit, searchResult } = useSearchUser();
  const SearchedUsers = useRefToList({ snapList: searchResult });
  return (
    <AppBaseContainer
      title={t('page-title')}
      subTitle={t('page-subtitle')}
      appName="Seven"
      hideCrumbOnDownSm
    >
      <Grid container spacing={4} className="mb-5">
        <Grid item xs={12} lg={8}>
          <SearchSectionPaper>
            <Header>{t('search-user-title')}</Header>
            <Typography fontSize="0.8rem" className="text-gray-600 pt-1 pb-3">
              {t('search-user-subtitle')}
            </Typography>
            <SearchUserForm onSubmit={onSubmit} />
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

      <Divider className="py-4" />

      {!searchResult && (
        <div className="w-full flex justify-center py-7">
          <Typography>{t('no-search-condition')}</Typography>
        </div>
      )}
      <Box sx={{ py: 2.5, px: 2 }}>
        <Grid container>
          {SearchedUsers.map((x, i) => (
            <Grid xs={12} md={6} lg={4}>
              <RecommandedUser
                idx={i}
                rootStyle={{
                  marginBottom: 8,
                }}
                {...x}
                onFollow={(e, id) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('FOLLOW', id);
                }}
                onDetail={(e, id) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('DETAIL', id);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
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
  minHeight: 300,
  padding: theme.spacing(1.5, 2),
  borderRadius: 10,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
  },
}));

const RankedPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 300,
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
