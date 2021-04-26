import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import firebase from 'firebase/app';
import { useEffect, useMemo, useRef } from 'react';
import { ChatLiveUser, ChatRoom } from '@hessed/client-module/seven-chat';
import { useRTC } from '@hessed/hook/rtc';
import { useRecognition } from '@hessed/hook/recognition';
interface UseInitChat {
  userInfo: SevenUserInfo;
  roomInfo: ChatRoom;
  liveUserRef: firebase.firestore.CollectionReference<ChatLiveUser>;
}

export function useChat({ userInfo, liveUserRef, roomInfo }: UseInitChat) {
  const isReady = userInfo?.uid && liveUserRef && Boolean(roomInfo?.id);
  const liveUid = useMemo(
    () => parseInt((Math.random() * Math.pow(10, 5)).toString()),
    []
  );
  useEffect(() => {
    if (!isReady) {
      return;
    }
    initUserEnter();
  }, [userInfo?.uid, liveUserRef, roomInfo?.id]);

  const currentMsgRef = useRef(null);
  const modifyMessage = async (transcript: string) => {};
  const onSpeechStart = async () => {};
  const { setVolume, switchRole, userVolumeMap } = useRTC({
    liveUid,
    chatId: roomInfo?.hostId,
    isHost: userInfo?.uid === roomInfo?.hostId,
    ready: isReady,
  });
  const { initRecognition, recogOn, stopRecognition } = useRecognition({
    lang: roomInfo?.lang,
    onResult: modifyMessage,
    onSpeechStart,
  });

  const initUserEnter = async () => {
    initRecognition();
  };
  return [recogOn];
}
