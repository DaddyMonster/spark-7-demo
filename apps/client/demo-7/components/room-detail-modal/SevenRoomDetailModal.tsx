import React from 'react';
import { AvatarWithFlag, DetailInfoModal } from '@hessed/ui/web/atom';
import { ChatRoom } from '@hessed/client-module/seven-chat';
import dy from 'dayjs';
import { ROOM_TIME_FORMAT } from '@hessed/client-module/seven-shared';
import { Button, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useSevenTimeMsg } from '@hessed/hook/time-worker';
import { Translate } from 'next-translate';
interface RoomDetailModalProps {
  roomInfo: ChatRoom;
  onClose: () => void;
  t: Translate;
}

const SevenRoomDetailModal = ({
  roomInfo,
  onClose,
  t,
}: RoomDetailModalProps) => {
  const { topic, startTime, host, description } = roomInfo;

  const { message, status } = useSevenTimeMsg({
    endDue: 7 * 1000 * 1000,
    targetTime: dy(startTime.toDate()),
    onDue: () => console.log('DUE'),
  });

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
        <Button className="w-full h-full flex items-center bg-primary flex-col">
          <p>
            <Typography sx={{ color: '#fff' }} fontSize="0.6rem" className="mb-1">
              {message}
            </Typography>
            <Typography sx={{ color: '#fff' }}>
              {t('status-' + status)}
            </Typography>
          </p>
        </Button>
      )}
    >
      <div className="px-3 py-5">
        <p>{description || t('noDescriptionMsg')}</p>
      </div>
    </DetailInfoModal>
  );
};

export default SevenRoomDetailModal;