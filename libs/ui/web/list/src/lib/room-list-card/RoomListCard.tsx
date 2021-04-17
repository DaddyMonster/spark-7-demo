import { ChatRoom } from '@hessed/client-module/seven-chat';
import { NationFlagSquare, StackedAvatars } from '@hessed/ui/web/atom';
import { Avatar, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import dy from 'dayjs';
import rl from 'dayjs/plugin/relativeTime';
import React, { useMemo } from 'react';
import styled from 'styled-components';

// 추가 필요 작업 내역
// - 높이 사이즈 조절 (Responsive)
// - Stacked Avatar 에 id 부여 기능 적용

dy.extend(rl);

interface Props extends ChatRoom {
  onClick: (id: string) => void;
}

export const RoomListCard = ({
  topic,
  /* description,
  createdAt, */
  host,
  /* hostId, */
  id,
  lang,
  onClick,
  reserved,
}: /* startTime,
  tags, */
Props) => {
  const userURLs = useMemo(() => reserved.map((x) => x.photoURL), [reserved]);

  return (
    <Root onClick={() => onClick(id)}>
      <div className="w-full flex" style={{ height: 80 }}>
        <Typography
          fontSize="1rem"
          className="text-bold p-3 font-guide font-bold"
          textOverflow="ellipsis"
          height={80}
          whiteSpace="normal"
          lineHeight="1.4"
          overflow="hidden"
        >
          {topic}
        </Typography>
        <div className="flex items-center py-1 ml-auto relative">
          <div className="relative mr-2">
            <Avatar src={host.photoURL} />
            <FlagWrap>
              <NationFlagSquare nation={host.localLang} size={15} />
            </FlagWrap>
          </div>
          <div className="flex flex-col justify-center px-2">
            <Typography fontSize="0.7rem">{host.displayName}</Typography>
            <Typography fontSize="0.5rem" className="ml-1" color={grey[600]}>
              trusted
            </Typography>
          </div>
        </div>
      </div>

      <Divider />
      <Grid container>
        <Grid item xs={6}>
          <div className="flex h-full items-center pt-1 px-2">
            <NationFlagSquare nation={lang} size={25} shadow />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="flex h-full">
            <StackedAvatars overlay urls={userURLs} />
          </div>
        </Grid>
      </Grid>
    </Root>
  );
};

const Root = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: 5,
  boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.8)',
  position: 'relative',
  padding: theme.spacing(1),
  overflow: 'hidden',
}));

const FlagWrap = styled.div(({ theme }) => ({
  position: 'absolute',
  bottom: -7,
  right: -7,
}));
