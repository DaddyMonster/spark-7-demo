import dy from 'dayjs';
import { createStore } from '@hessed/hook/store';
import { Dayjs } from 'dayjs';
import firebase from 'firebase/app';
import { Nation } from '@hessed/client-module/seven-shared';
export interface ChatCacheValue {
  createdAt: Dayjs;
  list: DocSnapshot[];
}
export type DocSnapshot = firebase.firestore.DocumentSnapshot;
export type ChatCache = Map<string, ChatCacheValue>;

export type ChatRoomCacheKey = 'reserve' | 'host' | Nation;

type ChatListStore = {
  cache: ChatCache;
  addCache: (key: ChatRoomCacheKey, snaps: DocSnapshot[]) => void;
  appendItem: (key: ChatRoomCacheKey, snap: DocSnapshot) => boolean;
  filterItem: (key: ChatRoomCacheKey, idx: number) => boolean;
  getCache: (key: ChatRoomCacheKey) => ChatCacheValue | null;
};

export const useChatListStore = createStore<ChatListStore>((set, get) => ({
  cache: new Map(),
  addCache: (key, snaps) => {
    const createdAt = dy();
    const newMap = new Map(get().cache).set(key, { list: snaps, createdAt });
    set((store) => void (store.cache = newMap));
  },
  appendItem: (key, snap): boolean => {
    const cachedMap = get().cache.get(key);
    if (!cachedMap) return false;
    const appended: ChatCacheValue = {
      createdAt: dy(),
      list: [...cachedMap.list, snap],
    };
    set(
      (store) => void (store.cache = new Map(get().cache.set(key, appended)))
    );
    return true;
  },
  filterItem: (key, idx) => {
    const cached = get().cache.get(key);
    if (!cached) return false;
    const filteredList = cached.list.filter((_, i) => i !== idx);
    set(
      (store) =>
        void (store.cache = new Map(
          get().cache.set(key, { createdAt: dy(), list: filteredList })
        ))
    );
  },
  getCache: (key): ChatCacheValue | null => {
    const cached = get().cache.get(key);
    if (!cached) return null;
    const { createdAt } = cached;
    if (dy().diff(createdAt, 'minutes') > 5) {
      return null;
    }
    return cached;
  },
}));
