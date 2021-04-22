import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import firebase from 'firebase/app';
import { useMemo } from 'react';
import { ChatRoom, ChatUser } from './model';
import { ChatRoomCacheKey, useChatListStore } from './useChatListStore';
import shallow from 'zustand/shallow';
export interface UserChatDetailProps {
  cacheKey: ChatRoomCacheKey | null;
  selectedIdx: number;
  userInfo: SevenUserInfo;
}

interface UseReserveActionReturn {
  onReserveClick: () => void;
  roomDetail: ChatRoom;
}

export function useChatDetail(
  { cacheKey, selectedIdx, userInfo }: UserChatDetailProps,
  dep = true
): UseReserveActionReturn {
  if (!dep) {
    return null;
  }

  const { cache, updateRef } = useChatListStore(
    (store) => ({
      cache: store.cache,
      updateRef: store.updateRef,
    }),
    shallow
  );

  const docRef = useMemo(
    () => (cacheKey ? cache.get(cacheKey).list[selectedIdx] : null),
    [cache, cacheKey, selectedIdx]
  );

  const roomDetail = useMemo(
    () => (docRef ? (docRef.data() as ChatRoom) : null),
    [docRef]
  );

  const meAsChatUser: ChatUser = useMemo(() => {
    if (!userInfo) return null;
    const { displayName, photoURL, localLang, uid } = userInfo;
    return { uid, photoURL, nation: localLang, displayName };
  }, [userInfo]);

  const onReserveClick = async () => {
    if (roomDetail.reserved.includes(meAsChatUser)) {
      docRef.ref.update({
        reserved: firebase.firestore.FieldValue.arrayRemove(meAsChatUser),
      });
    } else {
      docRef.ref.update({
        reserved: firebase.firestore.FieldValue.arrayUnion(meAsChatUser),
      });
    }
    updateRef(cacheKey, selectedIdx, await docRef.ref.get());
  };

  return { onReserveClick, roomDetail };
}
