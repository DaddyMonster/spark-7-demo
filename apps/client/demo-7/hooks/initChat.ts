import { useEffect } from 'react';
import { auth } from '../lib/firebase-init';
import { ChatMeta, ChatMetaCollection } from '../model/chat-meta';
import { UserDetail } from '../model/user-detail';
import { useChatStore, useReservedStore } from '../store/chat.store';
import { Nation } from '../types/nation';

export function useInitChat(user: UserDetail) {
  const {
    setInited,
    hasInitiated,
    setLearningLangs,
    setMyLang,
    filterOutdated,
    resetInited,
  } = useChatStore();

  const { setReserved } = useReservedStore();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setLearningLangs([]);
        setMyLang([]);
        resetInited();
      }
    });
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (hasInitiated) {
      filterOutdated();
      return;
    }
    initLists();
  }, [user]);

  const initLists = async () => {
    const { learningLang, localLang } = user;

    const [learning, local, reserved] = await Promise.all([
      fetchLearing(learningLang),
      fetchLocal(localLang),
      fetchReserved(user.uid),
    ]);
    console.log(
      'CHAT LISTS ',
      'LEARNING ',
      learning,
      'LOCAL',
      local,
      'RESERVED',
      reserved
    );

    setLearningLangs(learning);
    setMyLang(local);
    setReserved(reserved);
    setInited();
  };

  const fetchLearing = async (learningLangs: Nation[]): Promise<ChatMeta[]> => {
    const query = await ChatMetaCollection.where('lang', 'in', learningLangs)
      .orderBy('startTime')
      .limit(10)
      .get();
    // ADD FILTER CHAT THAT IM  HOST
    return query.docs.map((x): ChatMeta => x.data() as ChatMeta);
  };

  const fetchLocal = async (localLang: Nation): Promise<ChatMeta[]> => {
    const query = await ChatMetaCollection.where('lang', '==', localLang)
      .orderBy('startTime')
      .limit(10)
      .get();
    // ADD FILTER CHAT THAT IM  HOST
    return query.docs.map((x): ChatMeta => x.data() as ChatMeta);
  };

  const fetchReserved = async (uid: string) => {
    const query = await ChatMetaCollection.where(
      'reserved',
      'array-contains',
      uid
    ).get();
    return query.docs.map((x): ChatMeta => x.data() as ChatMeta);
  };
}
