import dy from 'dayjs';
import { createStore } from '@hessed/hook/store';
import { Dayjs } from 'dayjs';
import firebase from 'firebase/app';
import { Nation } from '@hessed/client-module/seven-shared';
import { DocData } from '@hessed/client-lib/firebase';
import { ChatRoom } from './model';

export type DocSnapshot<T = DocData> = firebase.firestore.DocumentSnapshot<T>;
export type ChatSnapShot = DocSnapshot<ChatRoom>;
export interface ChatCacheValue {
  createdAt: Dayjs;
  list: ChatSnapShot[];
}
export type ChatCache = Map<string, ChatCacheValue>;

export type ChatRoomCacheKey = 'reserve' | 'host' | Nation | 'history';

type ChatListStore = {
  cache: ChatCache;
  addCache: (key: ChatRoomCacheKey, snaps: ChatSnapShot[]) => void;
  appendItem: (key: ChatRoomCacheKey, snap: ChatSnapShot) => boolean;
  filterItem: (key: ChatRoomCacheKey, idx: number) => boolean;
  getCache: (key: ChatRoomCacheKey) => ChatCacheValue | null;
  updateRef: (key: ChatRoomCacheKey, idx: number, snap: ChatSnapShot) => void;
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
    return true;
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
