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
  updateRef: (key: ChatRoomCacheKey, idx: number, snap: DocSnapshot) => void;
};

export const useChatListStore = createStore<ChatListStore>((set, get) => ({
  cache: new Map(),
  addCache: (key, snaps) => {
    const createdAt = dy();
    set((store) => {
      store.cache.set(key, { createdAt, list: snaps });
    });
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
    if (!get().cache.get(key)) return false;
    set((store) => {
      store.cache.get(key).list.filter((x, i) => i !== idx);
    });
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
  updateRef: (key, idx, snap) => {
    if (!get().cache.get(key)) return;
    set((prev) => {
      prev.cache.get(key).list.splice(idx, 1, snap);
    });
  },
}));
