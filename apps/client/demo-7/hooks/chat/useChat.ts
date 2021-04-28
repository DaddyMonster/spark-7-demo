import {
  DocRef,
  FbTimestamp,
  ArrayUnion,
  Increment,
} from '@hessed/client-lib/firebase';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import {
  ChatLiveUser,
  ChatMessage,
  ChatRoom,
  defaultTranslated,
  getChatUserFromInfo,
} from '@hessed/client-module/seven-chat';
import { useRecognition } from '@hessed/hook/recognition';
import { useRTC } from '@hessed/hook/rtc';
import { ClientRole } from 'agora-rtc-sdk-ng';
import firebase from 'firebase/app';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useRef } from 'react';
import { SevenUser } from '@hessed/client-module/seven-auth';
import { useLiveVolumeStore } from './useVolumeStore';

type FbLivUserRef = firebase.firestore.CollectionReference<ChatLiveUser>;
type FbChatMsgRef = firebase.firestore.CollectionReference<ChatMessage>;
type FbChatMsgDocRef = firebase.firestore.DocumentReference<ChatMessage>;
interface UseInitChatProps {
  userInfo: SevenUserInfo;
  roomInfo: ChatRoom;
  liveUserRef: FbLivUserRef;
  chatMsgRef: FbChatMsgRef;
  me: ChatLiveUser | null;
  onItemAdded: () => void;
  docRef: DocRef<ChatRoom>;
}

interface UseChatState {
  recogOn: boolean;
}

type UseChatReturn = [UseChatState];
export function useChat({
  userInfo,
  liveUserRef,
  roomInfo,
  me,
  chatMsgRef,
  onItemAdded,
  docRef,
}: UseInitChatProps): UseChatReturn {
  const isReady = useMemo(
    () => userInfo?.uid && liveUserRef && Boolean(roomInfo?.id),
    [userInfo?.uid, liveUserRef, roomInfo?.id]
  );
  const liveUid = useMemo(
    () => parseInt((Math.random() * Math.pow(10, 5)).toString()),
    []
  );
  const myRoleRef = useRef<ClientRole>(null);
  useEffect(() => {
    if (!isReady || !me) {
      return;
    }
    if (myRoleRef.current !== me?.role) {
      switchRole(me.role);
      if (me.role === 'audience') terminateRecognition();
      myRoleRef.current = me?.role;
    }
  }, [me?.role, isReady]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    initUserEnter();
  }, [userInfo?.uid, liveUserRef, roomInfo?.id]);

  const currentMsgRef = useRef<FbChatMsgDocRef | null>(null);
  const modifyMessage = async (transcript: string) => {
    if (!currentMsgRef.current) {
      return;
    }

    if (!transcript) {
      await currentMsgRef.current.delete();
      currentMsgRef.current = null;
      return;
    }

    await currentMsgRef.current.update({
      message: transcript,
    });
  };

  const onSpeechStart = async () => {
    const newId = nanoid();
    console.log('SPEECH STARTED!', newId);
    currentMsgRef.current = chatMsgRef.doc(newId);
    await currentMsgRef.current.set({
      cloudVoiceURL: '',
      createdAt: FbTimestamp.fromDate(new Date()),
      id: newId,
      message: '...',
      roomId: roomInfo.id,
      translations: defaultTranslated,
      user: getChatUserFromInfo(userInfo),
      type: 'voice',
    });
    onItemAdded();
  };

  const updateVolMap = useLiveVolumeStore((store) => store.updateVolMap);
  const { switchRole } = useRTC({
    liveUid,
    chatId: roomInfo?.hostId,
    isHost: userInfo?.uid === roomInfo?.hostId,
    ready: isReady,
    useGlobalSetter: updateVolMap,
  });

  const { initRecognition, recogOn, terminateRecognition } = useRecognition({
    lang: roomInfo?.lang,
    onResult: modifyMessage,
    onSpeechStart,
  });

  const registerUserToChat = async () => {
    const { displayName, uid, photoURL, localLang } = userInfo;
    const isHost = userInfo.uid === roomInfo.hostId;
    await liveUserRef.doc(uid).set({
      hasLeft: false,
      liveUid,
      photoURL,
      handUp: false,
      displayName,
      joinedAt: FbTimestamp.fromDate(new Date()),
      nation: localLang,
      role: isHost ? 'host' : 'audience',
      uid,
    });
    await docRef.update({
      joinedUserIdRecord: ArrayUnion(me.uid),
    });
    if (isHost) {
      await SevenUser.collection.doc(userInfo.uid).update({
        hostedCount: Increment(1),
      });
    }
  };

  const initUserReference = () => {
    myRoleRef.current = userInfo.uid === roomInfo.hostId ? 'host' : 'audience';
  };
  const initUserEnter = async () => {
    initRecognition();
    initUserReference();
    await registerUserToChat();
  };

  const ReturnState = useMemo(() => ({ recogOn }), [recogOn]);

  return [ReturnState];
}
