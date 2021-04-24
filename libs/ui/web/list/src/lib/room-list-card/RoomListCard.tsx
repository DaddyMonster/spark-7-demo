import { ChatRoom } from '@hessed/client-module/seven-chat';
import { useSevenTimeMsg } from '@hessed/hook/time-worker';
import { NationFlagSquare, StackedAvatars } from '@hessed/ui/web/atom';
import { Avatar, Button, Paper, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import dy from 'dayjs';
import 'dayjs/locale/ko';
import rl from 'dayjs/plugin/relativeTime';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AvatarWithFlag } from '@hessed/ui/web/atom';

// 추가 필요 작업 내역
// - 높이 사이즈 조절 (Responsive)
// - Stacked Avatar 에 id 부여 기능 적용

dy.extend(rl);
dy.locale('ko');
interface OnClickArgs {
  id: string;
  idx: number;
  event: React.MouseEvent;
}

export interface RoomListCardProps extends ChatRoom {
  onClick: (args: OnClickArgs) => void;
  idx: number;
}

export const RoomListCard = ({
  topic,
  /* description,
  createdAt, */
  host,
  /* hostId, */
  createdAt,
  startTime,
  id,
  lang,
  onClick,
  reserved,
  tags,
  idx,
}: RoomListCardProps) => {
  const userURLs = useMemo(() => reserved.map((x) => x.photoURL), [reserved]);
  const ca = dy(startTime.toDate());
  const { message } = useSevenTimeMsg({
    endDue: 7 * 1000 * 60,
    targetTime: dy(startTime.toDate()),
    onDue: () => console.log('DUE'),
  });

  return (
    <Root>
      <RootCard onClick={(event) => onClick({ id, idx, event })}>
        <div className="w-full flex flex-col py-3 px-3" style={{ height: 240 }}>
          <div
            style={{ height: 100 }}
            className="flex justify-center items-center"
          >
            <Typography
              fontSize="1.3rem"
              className="text-bold p-3 font-guide font-bold"
              textOverflow="ellipsis"
              whiteSpace="normal"
              lineHeight="1.4"
              overflow="hidden"
            >
              {topic}
            </Typography>
          </div>
          <div className="px-2 flex items-center mt-auto">
            <NationFlagSquare
              nation={host.localLang}
              size={35}
              className="mr-3"
            />
            <Typography fontSize="1.1rem" className="mr-3">
              {ca.fromNow()}
            </Typography>
            <Typography color={grey[600]} fontSize="0.9rem">
              {ca.format('MMM D dd A hh:MM')}
            </Typography>
          </div>
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
        </div>

        <StackedBox>
          <StackedAvatars overlay urls={userURLs} />
        </StackedBox>

        <div className="px-2 py-1 flex justify-center items-center bg-primary">
          <Button sx={{ color: '#fff' }}>{message}</Button>
        </div>
      </RootCard>
    </Root>
  );
};

const Root = styled.div(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
}));

const RootCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: 5,
  boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.8)',
  position: 'relative',
  overflow: 'hidden',
  paddingBottom: theme.spacing(1.5),
}));

const StackedBox = styled.div(({ theme }) => ({
  width: '100%',
  hight: 40,
}));
