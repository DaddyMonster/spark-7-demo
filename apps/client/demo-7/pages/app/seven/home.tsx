import {
  DocSnap,
  FbTimestamp,
  useRefToList,
} from '@hessed/client-lib/firebase';
import {
  SevenUser,
  SevenUserInfo,
  useSevenAuth,
} from '@hessed/client-module/seven-auth';
import { CarouselTemplate } from '@hessed/ui/web/carousel';
import { AppBaseContainer, SectionRootWithTitle } from '@hessed/ui/web/layout';
import { Button, Grid, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Chat,
  useChatList,
  useChatDetail,
} from '@hessed/client-module/seven-chat';
import { RoomListCard } from '@hessed/ui/web/list';
import { RecommandedUser } from '../../../components/user-card/RecommandedUser';
import { SevenPageType } from '../../../types';
import { useChatRoomSelect } from '../../../hooks/useChatRoomSelect';

const SevenHome: SevenPageType = () => {
  const { t } = useTranslation('seven-home');
  const { user } = useSevenAuth();
  const [recUserDoc, setrecUserDoc] = useState<DocSnap[]>([]);

  const { detailInfos, handleRoomClick, resetDetail } = useChatRoomSelect();

  const { roomDetail, onReserveClick } = useChatDetail({
    cacheKey: detailInfos.cacheKey,
    selectedIdx: detailInfos.selectedIdx,
    userInfo: user,
  });

  useEffect(() => {
    if (!user || !user.interests) return;
    SevenUser.recommaded(user.interests.slice(0, 9), 10).then((x) =>
      setrecUserDoc(x)
    );
  }, [user?.interests]);

  const recUsers = useMemo(
    () => recUserDoc.map((x) => x.data() as SevenUserInfo),
    [recUserDoc]
  );

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

  return (
    <AppBaseContainer
      title={t('page-title')}
      subTitle={t('page-subtitle')}
      appName="Seven"
      hideCrumbOnDownSm={false}
    >
      <CarouselTemplate
        title={t('recommand-user')}
        TitleMisc={() => (
          <div className="ml-auto px-3">
            <Button>{t('see-more-user')}</Button>
          </div>
        )}
        noListMessage={t('no-recommand-user-msg')}
      >
        {recUsers.map((x, i) => (
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
