import { Avatar, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import dy from 'dayjs';
import rl from 'dayjs/plugin/relativeTime';
import React from 'react';
import styled from 'styled-components';
import { ChatMeta } from '../../model/chat-meta';
import { NationFlag } from '../flag/NationFlag';
import StackedAvatars from '../icons/StackedAvatars';

dy.extend(rl);

interface Props extends ChatMeta {
  onClick: (id: string) => void;
}

const ChatMetaCard = ({
  description,
  lang,
  topic,
  onClick,
  hostId,
  id,
  host,
  createdAt,
  startTime,
}: Props) => {
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
              <NationFlag nation={host.localLang} sizes={15} />
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
            <NationFlag nation={lang} sizes={25} shadow />
          </div>
        </Grid>
        <Grid item xs={6}>
          <StackedAvatars
            overlay
            urls={Array(30).fill(
              'https://material-ui.com/static/images/avatar/1.jpg'
            )}
          />
        </Grid>
      </Grid>
    </Root>
  );
};

export default ChatMetaCard;

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
