import { useSevenAuth } from '@hessed/client-module/seven-auth';
import {
  Chat,
  ChatRoom,
  useChatDetail,
  useChatList,
  UserChatDetailProps,
} from '@hessed/client-module/seven-chat';
import { Nation } from '@hessed/client-module/seven-shared';
import { CarouselTemplate } from '@hessed/ui/web/carousel';
import { AppBaseContainer } from '@hessed/ui/web/layout';
import { RoomListCard } from '@hessed/ui/web/list';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { SevenPageType } from '../../../types';

type DetailInfoArgs = Omit<UserChatDetailProps, 'userInfo'>;

const SevenHome: SevenPageType = () => {
  const { user } = useSevenAuth();

  const [detailInfos, setdetailInfos] = useState<DetailInfoArgs>({
    cacheKey: null,
    selectedIdx: -1,
  });
  const chatDetail = useChatDetail(
    {
      cacheKey: detailInfos.cacheKey,
      selectedIdx: detailInfos.selectedIdx,
      userInfo: user,
    },
    Boolean(user)
  );

  const RoomsForLearning = useChatList(
    {
      queryCacheKey: user?.learningLang,
      listQuery: (ts) =>
        Chat.languageQuery({
          interests: user?.interests,
          lang: user?.learningLang,
          ts,
        }),
    },
    Boolean(user)
  );

  const RoomsInMyLang = useChatList(
    {
      queryCacheKey: user?.localLang,
      listQuery: (ts) =>
        Chat.languageQuery({
          interests: user?.interests,
          lang: user?.localLang,
          ts,
        }),
    },
    Boolean(user)
  );

  const handleRoomClick = (lang: Nation, idx: number) => {
    setdetailInfos({ cacheKey: lang, selectedIdx: idx });
  };

  const { t } = useTranslation('seven-home');

  return (
    <AppBaseContainer
      title={t('page-title')}
      subTitle={t('page-subtitle')}
      appName="Seven"
      hideCrumbOnDownSm={false}
    >
      <CarouselTemplate
        noListMessage={t('no-list-message')}
        title={t('learning-lite-title')}
      >
        {RoomsForLearning?.refList.map((x, i) => {
          const doc = x.data() as ChatRoom;
          return (
            <RoomListCard
              {...doc}
              key={doc.id}
              idx={i}
              onClick={({ idx }) => handleRoomClick(user.learningLang, idx)}
            />
          );
        })}
      </CarouselTemplate>
      <CarouselTemplate
        noListMessage={t('no-list-message')}
        title={t('local-list-title')}
      >
        {RoomsInMyLang?.refList.map((x, i) => {
          const doc = x.data() as ChatRoom;
          return (
            <RoomListCard
              {...doc}
              key={doc.id}
              idx={i}
              onClick={({ idx }) => handleRoomClick(user.learningLang, idx)}
            />
          );
        })}
      </CarouselTemplate>
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
