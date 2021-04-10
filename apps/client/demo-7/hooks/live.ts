import dy from 'dayjs';
import utc from 'dayjs/plugin/utc';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { ChatMessage, chatQuery } from '../model/chat-message';
import {
  AddLiveUser,
  ChatMeta,
  ChatMetaCollection,
  LiveJoinedUser,
  RemoveLiveUser,
} from '../model/chat-meta';
import { UserDetail } from '../model/user-detail';
import { useAuth } from './auth';

dy.extend(utc);

interface useLiveReturn {
  chatMeta: ChatMeta;
  loading: boolean;
  users: LiveJoinedUser[];
  messages: ChatMessage[];
  me: UserDetail;
  liveUid: number;
}

type UnloadRef = {
  allUsers: LiveJoinedUser[];
  me: UserDetail;
};

export function useLive(): useLiveReturn {
  const { query } = useRouter();
  const { user } = useAuth();
  const roomId = query.room as string;
  const [msgSnap, msgLoading, msgError] = useCollection(chatQuery(roomId));
  const [chatMetaSnap, chatMetaLoading, chatMetaError] = useDocument<ChatMeta>(
    ChatMetaCollection.doc(roomId)
  );
  const [liveUid, setliveUid] = useState(-1);
  const chatMeta = useMemo(() => {
    if (chatMetaSnap) {
      return chatMetaSnap.data();
    }

    return null;
  }, [chatMetaSnap]);

  const users = useMemo((): LiveJoinedUser[] => {
    if (!chatMetaSnap || chatMetaError) {
      return [];
    }
    return chatMetaSnap.data().liveUsers;
  }, [chatMetaSnap, chatMetaError]);

  const messages = useMemo(() => {
    if (msgLoading || msgError || !msgSnap) {
      return [];
    }
    return msgSnap.docs.map((x) => x.data() as ChatMessage);
  }, [msgSnap, msgLoading, msgError]);

  const unloadRef = useRef<UnloadRef>(null);

  useEffect(() => {
    if (chatMetaSnap && user) {
      unloadRef.current = {
        allUsers: chatMetaSnap.data().liveUsers,
        me: user,
      };
    }
  }, [chatMetaSnap, user]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => leave());
    return () => leave();
  }, []);

  const loading = useMemo(() => {
    const loaded =
      user &&
      roomId &&
      !chatMetaLoading &&
      !msgLoading &&
      Boolean(chatMetaSnap);
    return !loaded;
  }, [roomId, chatMetaLoading, msgLoading, user, chatMetaSnap]);

  useEffect(() => {
    if (!roomId || !user || loading) {
      console.log("THERE'S NO ROOM ID OR USER!");
      return;
    }
    initLive(roomId);
  }, [roomId, user, loading]);

  const initLive = async (roomId: string) => {
    await initUserEnter(roomId);
  };
  const initUserEnter = async (roomId: string) => {
    const { displayName, photoURL, uid, localLang } = user;
    const newLiveUid = parseInt((Math.random() * Math.pow(10, 5)).toString());
    const role = uid === chatMeta.hostId ? 'host' : 'audience';
    setliveUid(newLiveUid);
    await AddLiveUser(roomId, {
      uid,
      photoURL: photoURL ?? '',
      displayName,
      isIn: true,
      nation: localLang,
      role,
      liveUid: newLiveUid,
    });
  };

  /*   const addMessage = async (msg: string) => {
    const { displayName, uid, localLang, photoURL } = user;
    const createdAt = firebase.firestore.Timestamp.fromDate(
      dy().utc().toDate()
    );
    addChatToCollection(roomId, {
      createdAt,
      message: msg,
      roomId,
      user: { displayName, uid, nation: localLang, photoURL: photoURL ?? '' },
    });
  }; */

  const leave = () => {
    if (!unloadRef.current) {
      console.log('Cannot find ref!');
      return;
    }
    const { allUsers, me } = unloadRef.current;
    const self = allUsers.find((x) => x.uid === me.uid);
    console.log('ME LEAVING', self);
    alert(JSON.stringify(self));
    RemoveLiveUser(roomId, self);
  };

  return {
    chatMeta,
    loading,
    users,
    messages,
    me: user,
    liveUid,
  };
}
