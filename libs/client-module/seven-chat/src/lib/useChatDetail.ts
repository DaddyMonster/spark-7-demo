import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import firebase from 'firebase/app';
import { useMemo } from 'react';
import { ChatRoom, ChatUser } from './model';
import { DocSnapshot } from './useChatListStore';

interface UseReserveActionProps {
  docRef: DocSnapshot;
  userInfo: SevenUserInfo;
}

interface UseReserveActionReturn {
  onReserveClick: () => void;
  chatDetail: ChatRoom;
}

export function useChatDetail({
  docRef,

  userInfo,
}: UseReserveActionProps): UseReserveActionReturn {
  const chatDetail = useMemo(() => docRef.data() as ChatRoom, [docRef]);

  const meAsChatUser: ChatUser = useMemo(() => {
    if (!userInfo) return null;
    const { displayName, photoURL, localLang, uid } = userInfo;
    return { uid, photoURL, nation: localLang, displayName };
  }, [userInfo]);

  const onReserveClick = () => {
    if (chatDetail.reserved.includes(meAsChatUser)) {
      docRef.ref.update({
        reserved: firebase.firestore.FieldValue.arrayRemove(meAsChatUser),
      });
    } else {
      docRef.ref.update({
        reserved: firebase.firestore.FieldValue.arrayUnion(meAsChatUser),
      });
    }
  };

  return { onReserveClick, chatDetail };
}
