import { useSevenAuth } from '@hessed/client-module/seven-auth';
import {
  Chat,
  ChatRoom,
  useChatDetail,
  useChatList,
} from '@hessed/client-module/seven-chat';
import { AppBaseContainer } from '@hessed/ui/web/layout';
import { RoomListCard } from '@hessed/ui/web/list';
import { Grid } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import SevenRoomDetailModal from '../../../components/room-detail-modal/SevenRoomDetailModal';
import { useChatRoomSelect } from '../../../hooks/useChatRoomSelect';

const Reservations = () => {
  const { user } = useSevenAuth();

  const { detailInfos, handleRoomClick, resetDetail } = useChatRoomSelect();

  const { roomDetail, onReserveClick } = useChatDetail({
    cacheKey: detailInfos.cacheKey,
    selectedIdx: detailInfos.selectedIdx,
    userInfo: user,
  });

  const RoomsForLearning = useChatList({
    queryCacheKey: 'reserve',
    paging: 10,
    listQuery: (ts) => {
      if (!user) return null;
      return Chat.collection
        .where('reserversId', 'array-contains', user.uid)
        .where('startTime', '>', ts);
    },
  });

  const { t } = useTranslation('reservation');

  return (
    <AppBaseContainer
      appName="Seven"
      subTitle={t('page-subtitle')}
      title={t('page-title')}
    >
      {Boolean(roomDetail) && (
        <SevenRoomDetailModal
          onClose={resetDetail}
          roomInfo={roomDetail}
          onActionClick={(args) => console.log(args)}
          t={t}
        />
      )}
      {RoomsForLearning.refList.length > 0 ? (
        <Grid container spacing={0}>
          {RoomsForLearning.refList.map((x, i) => {
            const doc = x.data() as ChatRoom;
            return (
              <Grid item xs={12} md={6}>
                <RoomListCard
                  {...doc}
                  key={doc.id}
                  idx={i}
                  onClick={({ idx }) => handleRoomClick(user.learningLang, idx)}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div></div>
      )}
    </AppBaseContainer>
  );
};

export default Reservations;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};
