import { createStore } from '../lib/createStore';
import { ChatMeta } from '../model/chat-meta';
import dy from 'dayjs';
type TopicStore = {
  myLang: ChatMeta[];
  setMyLang: (chatMetas: ChatMeta[]) => void;
  learnigLangs: ChatMeta[];
  setLearningLangs: (chatMetas: ChatMeta[]) => void;
  hasInitiated: boolean;
  setInited: () => void;
  resetInited: () => void;
  filterOutdated: () => void;
};

export const filterChatList = (list: ChatMeta[]) =>
  list.filter(({ startTime }) => {
    const diff = dy().diff(startTime.toDate(), 'minutes');
    return diff < 4;
  });

export const useChatStore = createStore<TopicStore>((set) => ({
  myLang: [],
  setMyLang: (metas: ChatMeta[]) => set((prev) => void (prev.myLang = metas)),
  learnigLangs: [],
  setLearningLangs: (metas: ChatMeta[]) =>
    set((prev) => void (prev.learnigLangs = metas)),
  hasInitiated: false,
  setInited: () => set((prev) => void (prev.hasInitiated = true)),
  filterOutdated: () =>
    set((prev) => {
      prev.learnigLangs = filterChatList(prev.learnigLangs);
      prev.myLang = filterChatList(prev.myLang);
    }),
  resetInited: () => set((prev) => void (prev.hasInitiated = false)),
}));

type ImHost = {
  imHost: ChatMeta[];
  setImHost: (chatMetas: ChatMeta[]) => void;
};

export const useImHostStore = createStore<ImHost>((set) => ({
  imHost: [],
  setImHost: (metas: ChatMeta[]) => set((prev) => void (prev.imHost = metas)),
}));

type ReservedStore = {
  reserved: ChatMeta[];
  setReserved: (metas: ChatMeta[]) => void;
};

export const useReservedStore = createStore<ReservedStore>((set) => ({
  reserved: [],
  setReserved: (metas: ChatMeta[]) =>
    set((prev) => void (prev.reserved = metas)),
}));
