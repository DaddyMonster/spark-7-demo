import { useSevenAuth } from '@hessed/client-module/seven-auth';
import {
  Chat,
  ChatRoom,
  useChatDetail,
  useChatList,
} from '@hessed/client-module/seven-chat';
import { CarouselTemplate } from '@hessed/ui/web/carousel';
import { AppBaseContainer } from '@hessed/ui/web/layout';
import { RoomListCard } from '@hessed/ui/web/list';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import SevenRoomDetailModal from '../../../components/room-detail-modal/SevenRoomDetailModal';
import { useChatRoomSelect } from '../../../hooks/useChatRoomSelect';

const LearnAndTeach = () => {
  const { user } = useSevenAuth();

  const { detailInfos, handleRoomClick, resetDetail } = useChatRoomSelect();

  const { roomDetail, onRoomModalAction } = useChatDetail({
    cacheKey: detailInfos.cacheKey,
    selectedIdx: detailInfos.selectedIdx,
    userInfo: user,
  });

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

  const { t } = useTranslation('learn-and-teach');

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

export default LearnAndTeach;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};
