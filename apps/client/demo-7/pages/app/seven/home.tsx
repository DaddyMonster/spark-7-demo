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
import React, { useMemo, useState } from 'react';
import SevenRoomDetailModal from '../../../components/room-detail-modal/SevenRoomDetailModal';
import { SevenPageType } from '../../../types';

type DetailInfoArgs = Omit<UserChatDetailProps, 'userInfo'>;

const DEFAULT_DETAIL = { cacheKey: null, selectedIdx: -1 };

const SevenHome: SevenPageType = () => {
  const { user } = useSevenAuth();

  const [detailInfos, setdetailInfos] = useState<DetailInfoArgs>(
    DEFAULT_DETAIL
  );

  const detailOpen = useMemo(
    () => detailInfos.cacheKey && detailInfos.selectedIdx > -1,
    [detailInfos]
  );
  const chatDetail = useChatDetail({
    cacheKey: detailInfos.cacheKey,
    selectedIdx: detailInfos.selectedIdx,
    userInfo: user,
  });

  console.log('CHAT_DETAIL', chatDetail);

  const RoomsForLearning = useChatList({
    queryCacheKey: user?.learningLang,
    listQuery: (ts) =>
      Chat.languageQuery({
        interests: user?.interests,
        lang: user?.learningLang,
        ts,
      }),
  });

  const RoomsInMyLang = useChatList({
    queryCacheKey: user?.localLang,
    listQuery: (ts) =>
      Chat.languageQuery({
        interests: user?.interests,
        lang: user?.localLang,
        ts,
      }),
  });

  const handleRoomClick = (lang: Nation, idx: number) => {
    console.log(lang, idx);
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
      {detailOpen && (
        <SevenRoomDetailModal
          onClose={() => setdetailInfos(DEFAULT_DETAIL)}
          roomInfo={chatDetail?.roomDetail}
          t={t}
        />
      )}
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
              onClick={({ idx }) => handleRoomClick(user.localLang, idx)}
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
