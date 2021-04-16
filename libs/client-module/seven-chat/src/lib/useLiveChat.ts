import { DocRef, FbTimestamp } from '@hessed/client-lib/firebase';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { ClientRole } from 'agora-rtc-sdk-ng';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chat } from './chat.collection';
import { ChatMessage } from './model/chat.message.type';
import { ChatRoom } from './model/chat.room.type';
import { ChatLiveUser } from './model/chat.user.type';

interface UseLiveChatArgs {
  roomId: string;
  onInitiated: () => void;
  me: SevenUserInfo;
}

interface UseLiveChatStates {
  roomInfo: ChatRoom;
  msg: ChatMessage[];
  liveUsers: ChatLiveUser[];
  liveUid: number;
  loading: boolean;
}

interface UseLiveChatActions {
  createMsg: (msg: string) => void;
  updateMsg: (msg: string) => void;
  destroyCurrentChatRef: () => void;
}

export function useLiveChat({
  onInitiated,
  roomId,
  me,
}: UseLiveChatArgs): [UseLiveChatStates, UseLiveChatActions] {
  const chatRef = useRef<Chat>(null);
  const [roomInfo, setroomInfo] = useState<ChatRoom>(null);
  const [msg, setmsg] = useState<ChatMessage[]>([]);
  const [liveUsers, setliveUsers] = useState<ChatLiveUser[]>([]);
  const [liveUid, setliveUid] = useState(-1);
  const currentMsgRef = useRef<DocRef | null>(null);
  const meRef = useRef<DocRef>(null);
  const meAsChatUser = useMemo(() => liveUsers.find((x) => x.uid === me.uid), [
    me,
    liveUsers,
  ]);

  const loading = useMemo(() => {
    const allLoaded = liveUid && roomInfo;
    return !allLoaded;
  }, [liveUid, roomInfo]);

  // 룸 입장시 챗 초기화
  useEffect(() => {
    if (!roomId || !me) {
      return;
    }
    initChat(roomId);
    return () => void (chatRef.current = null);
  }, [roomId, me]);

  // 첫 로드후 챗룸에 유저 추가 => clean up : 유저 제거
  useEffect(() => {
    if (!roomInfo) {
      return;
    }
    enterMe();
    return () => leave();
  }, [roomInfo]);

  const initChat = async (roomId: string) => {
    chatRef.current = new Chat(roomId);
    await initRoomInfo();
    initMsg();
    initLiveUser();
    onInitiated();
  };

  const initMsg = () => {
    chatRef.current.msgRef
      .orderBy('createdAt')
      .limitToLast(30)
      .onSnapshot(({ docs }) => {
        setmsg(docs.map((x) => x.data() as ChatMessage));
      });
  };

  const initLiveUser = () => {
    chatRef.current.liveUserRef.onSnapshot(({ docs }) => {
      setliveUsers(docs.map((x) => x.data() as ChatLiveUser));
    });
  };

  const initRoomInfo = async () => {
    const { data } = await chatRef.current.docRef.get();
    setroomInfo(data() as ChatRoom);
  };

  // 음성인식 시작시 메시지 등록
  const createMsg = useCallback(
    (message = '') => {
      if (!meAsChatUser) {
        return;
      }
      const createdAt = FbTimestamp.fromDate(new Date());
      const id = nanoid();
      currentMsgRef.current = chatRef.current.msgRef.doc(id);
      const newMsg: ChatMessage = {
        cloudVoiceURL: '', // WILL SUPPORT SOON
        createdAt,
        id,
        message,
        roomId,
        user: meAsChatUser,
      };
      currentMsgRef.current.set(newMsg);
    },
    [currentMsgRef.current, meAsChatUser]
  );
  // 음성에 인식된 결과가 없으면 아래 함수 실행하기
  const destroyCurrentChatRef = useCallback(async () => {
    if (currentMsgRef.current) {
      await currentMsgRef.current.delete();
      currentMsgRef.current = null;
    }
  }, [currentMsgRef.current]);

  // 음성이 끝난 뒤 한번만 메시지를 업데이트 하고 Ref 제거
  const updateMsg = useCallback(
    async (message: string) => {
      if (!currentMsgRef.current) {
        return;
      }
      await currentMsgRef.current.update({
        message,
      });
      currentMsgRef.current = null;
    },
    [currentMsgRef.current]
  );

  const enterMe = useCallback(async () => {
    const { hostId } = roomInfo;
    const role: ClientRole = hostId === me.uid ? 'host' : 'audience';
    const liveUid = parseInt((Math.random() * Math.pow(10, 5)).toString());
    setliveUid(liveUid);
    const { displayName, localLang, photoURL, uid } = me;
    const meLive: ChatLiveUser = {
      displayName,
      nation: localLang,
      photoURL,
      role,
      uid,
      liveUid,
    };
    meRef.current = chatRef.current.liveUserRef.doc(uid);
    await meRef.current.set(meLive);
  }, [roomInfo, me]);

  const leave = async () => {
    if (!meRef.current) {
      return;
    }
    await meRef.current.delete();
  };

  return [
    { liveUsers, msg, roomInfo, liveUid, loading },
    { createMsg, destroyCurrentChatRef, updateMsg },
  ];
}
