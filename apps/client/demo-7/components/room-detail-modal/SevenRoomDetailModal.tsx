import { ChatRoom } from '@hessed/client-module/seven-chat';
import { ROOM_TIME_FORMAT } from '@hessed/client-module/seven-shared';
import { LiveStatus, useSevenTimeMsg } from '@hessed/hook/time-worker';
import { AvatarWithFlag, DetailInfoModal } from '@hessed/ui/web/atom';
import { alpha, Button, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import dy from 'dayjs';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styled from 'styled-components';

interface OnRoomModalActionArgs {
  status: LiveStatus;
}

type OnRoomModalAction = (args: OnRoomModalActionArgs) => void;

interface RoomDetailModalProps {
  roomInfo: ChatRoom;
  onClose: () => void;
  onActionClick: OnRoomModalAction;
}

const SevenRoomDetailModal = ({
  roomInfo,
  onClose,
  onActionClick,
}: RoomDetailModalProps) => {
  const { topic, startTime, host, description } = roomInfo;

  const { message, status } = useSevenTimeMsg({
    endDue: 7 * 1000 * 60,
    targetTime: dy(startTime.toDate()),
    onDue: () => console.log('DUE'),
  });

  const { t } = useTranslation('chat-detail-modal');

  return (
    <DetailInfoModal
      open={Boolean(roomInfo)}
      onClose={onClose}
      header={topic}
      subHeader={dy(startTime.toDate()).format(ROOM_TIME_FORMAT)}
      HeaderItem={() => (
        <div className="flex items-center pb-2 px-2 mt-auto ml-auto relative justify-between">
          <AvatarWithFlag
            className="mr-3"
            nation={host.localLang}
            photoURL={host.photoURL}
          />

          <div className="flex flex-col justify-center pt-1 px-2">
            <Typography fontSize="0.8rem">{host.displayName}</Typography>
            <Typography fontSize="0.7rem" color={grey[600]}>
              {host.reputation + ' User'}
            </Typography>
          </div>
        </div>
      )}
      FooterRenderer={() => (
        <ActionButton onClick={() => onActionClick({ status })}>
          <p>
            <Typography sx={{ color: '#fff' }}>
              {t('status-' + status)}
            </Typography>
          </p>
        </ActionButton>
      )}
    >
      <div className="px-3 py-5">
        <p>{description || t('noDescriptionMsg')}</p>
      </div>
      <Typography sx={{ color: '#fff' }} fontSize="0.6rem" className="mb-1">
        {message}
      </Typography>
    </DetailInfoModal>
  );
};

export default SevenRoomDetailModal;

const ActionButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  background: theme.palette.black.main,
  '&:hover': {
    background: alpha(theme.palette.black.main, 0.7),
  },
}));
