import { useRefToList } from '@hessed/client-lib/firebase';
import { useSevenAuth } from '@hessed/client-module/seven-auth';
import {
  Chat,
  useChatDetail,
  useChatList,
} from '@hessed/client-module/seven-chat';
import { CarouselTemplate } from '@hessed/ui/web/carousel';
import { AppBaseContainer, SectionRootWithTitle } from '@hessed/ui/web/layout';
import { RoomListCard, SimpleSingleColumnCard } from '@hessed/ui/web/list';
import { Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import SevenRoomDetailModal from '../../../components/room-detail-modal/SevenRoomDetailModal';
import { useChatRoomSelect } from '../../../hooks/useChatRoomSelect';
const ActivityLog = () => {
  const { t } = useTranslation('activity-log');
  const { user } = useSevenAuth();

  const HostedChat = useChatList({
    queryCacheKey: 'host',
    paging: 3,
    listQuery: (ts) =>
      user
        ? Chat.collection
            .where('hostId', '==', user.uid)
            .where('startTime', '>', ts)
        : null,
  });

  const ReservedChats = useChatList({
    queryCacheKey: 'reserve',
    paging: 5,
    listQuery: (ts) =>
      user
        ? Chat.collection
            .where('reserversId', 'array-contains', user.uid)
            .where('startTime', '>', ts)
            .orderBy('startTime', 'desc')
        : null,
  });

  const ChatHistory = useChatList({
    queryCacheKey: 'history',
    paging: 10,
    listQuery: (ts) =>
      user
        ? Chat.collection
            .where('joinedUserIdRecord', 'array-contains', user.uid)
            .orderBy('startTime', 'asc')
        : null,
  });

  const HostedList = useRefToList({ snapList: HostedChat.refList });
  const ReservedList = useRefToList({ snapList: ReservedChats.refList });
  const HistoryList = useRefToList({ snapList: ChatHistory.refList });

  const { detailInfos, handleRoomClick, resetDetail } = useChatRoomSelect();
  const { roomDetail, onReserveClick } = useChatDetail({
    cacheKey: 'reserve',
    selectedIdx: detailInfos.selectedIdx,
    userInfo: user,
  });

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
          onActionClick={onReserveClick}
        />
      )}
      <CarouselTemplate
        noListMessage={t('no-reserved-message')}
        title={t('reserved-list-title')}
      >
        <>
          {HostedList.map((x, i) => (
            <RoomListCard
              {...x}
              key={x.id}
              idx={i}
              onClick={({ idx }) => handleRoomClick('host', idx)}
            />
          ))}
          {ReservedList.map((x, i) => (
            <RoomListCard
              {...x}
              key={x.id}
              idx={i}
              onClick={({ idx }) => handleRoomClick('reserve', idx)}
            />
          ))}
        </>
      </CarouselTemplate>
      <SectionRootWithTitle title={t('activity-history')}>
        {HistoryList.map(({ startTime, description, lang, topic, id }) => (
          <SimpleSingleColumnCard
            key={id}
            dateDisplay={startTime.toDate()}
            subLabel={description}
            imgUrl={`/flags/${lang}.svg`}
            mainLabel={topic}
          />
        ))}
        {History.length === 0 && (
          <div className="w-full h-32 flex justify-center items-center">
            <Typography>{t('no-history-list')}</Typography>
          </div>
        )}
      </SectionRootWithTitle>
    </AppBaseContainer>
  );
};

export default ActivityLog;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};
