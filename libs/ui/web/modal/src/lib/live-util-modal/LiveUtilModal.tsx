import { Dialog, Typography } from '@material-ui/core';
import { UidMap } from '@hessed/client-module/seven-rtc';
import { ChatUserListCard } from '@hessed/ui/web/list';
import { ChatLiveUser } from '@hessed/client-module/seven-chat';
import React from 'react';
export type PopState = 'users' | 'tools' | 'closed';

interface Props {
  popState: PopState;
  users: ChatLiveUser[];
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
              <ChatUserListCard
                {...x}
                volume={userVolumeMap.get(x.liveUid) ?? 0}
                key={x.uid}
              />
            </>
          ))}
        {popState === 'tools' && (
          <div className="w-full p-2 mb-3 justify-center">
            <Typography>Will be available soon enough!</Typography>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ChatUtilModalBase;
