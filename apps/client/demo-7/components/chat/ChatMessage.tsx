import { Avatar, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import styled from 'styled-components';
export interface ChatMsgProps {
  message: string;
  displayName: string;
  photoURL: string;
  uid: string;
  clientUid: string;
  messageId: string;
  prevUid: string | null;
  isSpeaking: boolean;
  onClick: () => void;
}

const ChatMessage = ({
  displayName,
  message,
  photoURL,
  uid,
  messageId,
  prevUid,
  clientUid,
  isSpeaking,
  onClick,
}: ChatMsgProps) => {
  const isMine = useMemo(() => uid === clientUid, [uid, clientUid]);
  const isSerial = useMemo(() => prevUid === uid, [prevUid, uid]);

  return (
    <Root isMine={isMine} onClick={onClick}>
      <Avatar
        variant="rounded"
        src={photoURL}
        className="mx-2"
        sx={{ visibility: isSerial ? 'hidden' : 'visible' }}
      >
        {photoURL ? undefined : displayName[0]}
      </Avatar>
      <div className="flex flex-col">
        {!isSerial && (
          <Typography
            fontSize="0.8rem"
            className={`my-1 ${isMine ? 'ml-auto' : 'mr-auto'}`}
          >
            {displayName}
          </Typography>
        )}
        <div>
          <Msg $isMine={isMine} $isSerial={isSerial}>
            <span
              className={`relative ${isMine ? 'text-gray-800' : 'text-white'}`}
            >
              {message}
            </span>
          </Msg>
        </div>
      </div>
    </Root>
  );
};

export default ChatMessage;

interface MsgCompProps {
  $isMine: boolean;
  $isSerial: boolean;
}

const Root = styled.div<{ isMine: boolean }>(({ theme, isMine }) => ({
  display: 'flex',
  padding: theme.spacing(0.5, 1),
  flexDirection: isMine ? 'row-reverse' : 'row',
}));

const Msg = styled(Typography)<MsgCompProps>(
  ({ theme, $isMine: isMine, $isSerial: isSerial }) => {
    const bg = theme.palette[isMine ? 'secondary' : 'black'].main;
    return {
      display: 'inline-block',
      padding: theme.spacing(2),
      background: bg,
      color: isMine ? '#fff' : theme.palette.black.main,
      position: 'relative',
      margin: theme.spacing(0, 1.5),
      borderRadius: 15,
      boxShadow: theme.shadows[2],
      '&:before': {
        content: "''",
        position: 'absolute',
        left: isMine ? undefined : -15,
        right: isMine ? 5 : 0,
        top: 0,
        bottom: 0,
        width: 0,
        height: 0,
        borderStyle: isSerial ? 'none' : 'solid',
        borderWidth: isMine ? '25px 25px 25px 0' : '25px 25px 0 25px',
        borderColor: isMine
          ? `transparent ${bg} transparent transparent`
          : `${bg} transparent transparent transparent`,
        transform: `rotate(${isMine ? '-100deg' : '10deg'}) translateY(10px)`,
      },
    };
  }
);
