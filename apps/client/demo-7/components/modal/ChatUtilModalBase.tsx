import { Dialog, Typography } from '@material-ui/core';
import React from 'react';
import { LiveJoinedUser } from '../../model/chat-meta';
import ChatUserListItem from '../chat/ChatUserListItem';
import { UidMap } from '../../hooks/live-audio';
export type PopState = 'users' | 'tools' | 'closed';

interface Props {
  popState: PopState;
  users: LiveJoinedUser[];
  userVolumeMap: UidMap;
  onClose: () => void;
}

const ChatUtilModalBase = ({
  popState,
  users,
  onClose,
  userVolumeMap,
}: Props) => {
  return (
    <Dialog open={popState !== 'closed'} onClose={onClose} maxWidth="sm">
      <div className="w-full py-2 px-5" style={{ maxHeight: 500 }}>
        {popState === 'users' &&
          users.map((x) => (
            <>
              <div className="w-full p-2 mb-3 justify-center">
                <Typography>List of Users</Typography>
              </div>
              <ChatUserListItem
                {...x}
                volume={userVolumeMap.get(x.liveUid) ?? 0}
                key={x.uid}
              />
            </>
          ))}
      </div>
    </Dialog>
  );
};

export default ChatUtilModalBase;
