import { createStore } from '@hessed/hook/store';
import dy, { Dayjs } from 'dayjs';
import firebase from 'firebase/app';
import { QueryType } from './useChatRoomList';

export interface CacheKey {
  type: QueryType;
  args: unknown;
  cursor: number;
}

export interface CacheValue {
  cache_createdAt: Dayjs;
  roomList: DocSnapshot[];
}

type Cache = Map<CacheKey, CacheValue>;
type DocSnapshot = firebase.firestore.DocumentSnapshot;
type ChatRoomCache = {
  cache: Cache;
  addCache: (key: CacheKey, roomInfos: DocSnapshot[]) => void;
  sanitizeCache: () => void;
};

export const useChatRoomStore = createStore<ChatRoomCache>((set) => ({
  cache: new Map<CacheKey, CacheValue>(),
  addCache: (key: CacheKey, info: DocSnapshot[]) => {
    set(
      (prev) =>
        void prev.cache.set(key, { cache_createdAt: dy(), roomList: info })
    );
  },
  sanitizeCache: () =>
    set((prev) => {
      const keys = [...prev.cache.keys()];
      const now = dy();
      keys.forEach((cacheKey) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { cache_createdAt } = prev.cache.get(cacheKey)!;
        if (now.diff(cache_createdAt, 'minutes') > 5) {
          prev.cache.delete(cacheKey);
        }
      });
    }),
}));
