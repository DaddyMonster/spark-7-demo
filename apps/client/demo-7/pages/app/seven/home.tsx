import {
  DocSnap,
  FbTimestamp,
  useRefToList,
} from '@hessed/client-lib/firebase';
import {
  RecommadedUserArgs,
  SevenUser,
  SevenUserInfo,
  UserQuery,
  useSevenAuth,
  useUserCacheStore,
} from '@hessed/client-module/seven-auth';
import {
  Chat,
  useChatDetail,
  useChatList,
} from '@hessed/client-module/seven-chat';
import { useListCacheStore } from '@hessed/hook/store';
import { CarouselTemplate } from '@hessed/ui/web/carousel';
import { AppBaseContainer, SectionRootWithTitle } from '@hessed/ui/web/layout';
import { RoomListCard } from '@hessed/ui/web/list';
import { Button, Grid, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo } from 'react';
import SevenRoomDetailModal from '../../../components/room-detail-modal/SevenRoomDetailModal';
import { RecommandedUser } from '../../../components/user-card/RecommandedUser';
import { useChatRoomSelect } from '../../../hooks/useChatRoomSelect';
import { SevenPageType } from '../../../types';

const SevenHome: SevenPageType = () => {
  const { t } = useTranslation('seven-home');
  const { user } = useSevenAuth();

  const recommadedUserArgs = useMemo(
    () => (user ? { uid: user.uid, interests: user.interests } : null),
    [user]
  );
  const { list: recommandedUserRefs } = useListCacheStore<
    DocSnap<SevenUserInfo>,
    UserQuery,
    RecommadedUserArgs
  >({
    fetchArgs: recommadedUserArgs,
    store: useUserCacheStore,
    key: 'recommaded',
    limit: 10,
    ready: Boolean(user),
    fetchNext: async (lastItem, paging) =>
      await SevenUser.recommaded(recommadedUserArgs, paging, lastItem),
  });

  const { detailInfos, handleRoomClick, resetDetail } = useChatRoomSelect();
  const { roomDetail, onRoomModalAction } = useChatDetail({
    cacheKey: detailInfos.cacheKey,
    selectedIdx: detailInfos.selectedIdx,
    userInfo: user,
  });

  const LiveRefs = useChatList({
    queryCacheKey: 'live-now',
    listQuery: (ts) =>
      user
        ? Chat.collection
            .where('startTime', '>', ts)
            .where('startTime', '<', FbTimestamp.fromDate(new Date()))
            .where('lang', 'in', [user.localLang, user.learningLang])
            .orderBy('startTime')
            .limitToLast(10)
        : null,
  });
  const LiveList = useRefToList({ snapList: LiveRefs.refList });
  const RecommandedUsers = useRefToList({ snapList: recommandedUserRefs });
  return (
    <AppBaseContainer
      title={t('page-title')}
      subTitle={t('page-subtitle')}
      appName="Seven"
      hideCrumbOnDownSm={false}
    >
      {Boolean(roomDetail) && (
        <SevenRoomDetailModal
          onClose={resetDetail}
          roomInfo={roomDetail}
          onActionClick={onRoomModalAction}
        />
      )}
      <CarouselTemplate
        title={t('recommand-user')}
        TitleMisc={() => (
          <div className="ml-auto px-3">
            <Button>{t('see-more-user')}</Button>
          </div>
        )}
        noListMessage={t('no-recommand-user-msg')}
      >
        {RecommandedUsers.map((x, i) => (
          <div className="w-full h-full p-4" key={x.uid}>
            <RecommandedUser
              idx={i}
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
          </div>
        ))}
      </CarouselTemplate>

      <SectionRootWithTitle title={t('live-list')}>
        {LiveList.length > 0 ? (
          <Grid container spacing={2}>
            {LiveList.map((x, i) => (
              <Grid item xs={12} md={6} lg={4} key={x.id}>
                <RoomListCard
                  {...x}
                  idx={i}
                  onClick={({ idx }) => handleRoomClick('reserve', idx)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className="p-6 flex justify-center items-center">
            <Typography>{t('no-live-list')}</Typography>
          </div>
        )}
      </SectionRootWithTitle>
    </AppBaseContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};

export default SevenHome;
