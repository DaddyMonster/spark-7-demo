import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import firebase from 'firebase/app';
import { useMemo } from 'react';
import { ChatRoom, ChatUser } from './model';
import { ChatRoomCacheKey, useChatListStore } from './useChatListStore';
import shallow from 'zustand/shallow';
import { LiveStatus } from '@hessed/hook/time-worker';
export interface UserChatDetailProps {
  cacheKey: ChatRoomCacheKey | null;
  selectedIdx: number;
  userInfo: SevenUserInfo;
}

interface OnReserveClickArgBase {
  status: LiveStatus;
}

interface UseReserveActionReturn<T extends OnReserveClickArgBase> {
  onReserveClick: (args: T) => void;
  roomDetail: ChatRoom;
}

export function useChatDetail<T extends OnReserveClickArgBase>({
  cacheKey,
  selectedIdx,
  userInfo,
}: UserChatDetailProps): UseReserveActionReturn<T> {
  const { cache, updateRef } = useChatListStore(
    (store) => ({
      cache: store.cache,
      updateRef: store.updateRef,
    }),
    shallow
  );

  const docRef = useMemo(
    () =>
      cacheKey && cache.has(cacheKey)
        ? cache.get(cacheKey).list[selectedIdx]
        : null,
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

  const onReserveClick = async ({ status }: T) => {
    if (status !== 'waiting') {
      return;
    }

    if (roomDetail.reserved.includes(meAsChatUser)) {
      docRef.ref.update({
        reserved: firebase.firestore.FieldValue.arrayRemove(meAsChatUser),
        reserversId: firebase.firestore.FieldValue.arrayRemove(
          meAsChatUser.uid
        ),
      });
    } else {
      docRef.ref.update({
        reserved: firebase.firestore.FieldValue.arrayUnion(meAsChatUser),
        reserversId: firebase.firestore.FieldValue.arrayUnion(meAsChatUser.uid),
      });
    }
    updateRef(cacheKey, selectedIdx, await docRef.ref.get());
  };

  return { onReserveClick, roomDetail };
}
