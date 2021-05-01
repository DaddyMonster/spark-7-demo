import { createStore } from './create-store';

type Fetcher<T, U> = (key: U, args: unknown, limit: number) => Promise<T>;
export type CreatedStore<T, U> = {
  cache: Map<U, T | T[]>;
  addToCache: (key: U, item: T | T[]) => void;
  flush: (key?: U) => void;
  init: (key: U, args: unknown, limit: number) => Promise<void>;
  valueContainingKeys: U[];
};

export interface CacheStoreFactoryProps<T, U> {
  keyList: readonly U[];
  initFetch: Fetcher<T, U>;
}

export function CacheStoreFactory<T, U>({
  keyList,
  initFetch,
}: CacheStoreFactoryProps<T, U>) {
  return createStore<CreatedStore<T, U>>((set, get) => ({
    cache: new Map(),
    addToCache: (key, item) => {
      const value = get().cache.get(key);
      //CASE: VALUE IS ARRAY
      if (value && Array.isArray(value)) {
        // CASE: ITEM IS ARRAY
        if (Array.isArray(item)) {
          set((store) => void (store.cache.get(key) as T[]).concat(item));
          return;
        }

        // CASE: ITEM IS SINGLE ITEM
        set((store) => void (store.cache.get(key) as T[]).push(item));
        return;
      }
      // CASE: VALUE IS NOT ARRAY
      set((store) => void store.cache.set(key, item));
    },
    flush: (key) => {
      if (key) {
        set((store) => void store.cache.delete(key));
      } else {
        set((store) => void (store.cache = new Map()));
      }
    },
    init: async (key, args, limit) => {
      const exist = get().cache.get(key);
      if (exist) {
        return;
      }
      const item = await initFetch(key, args, limit);
      set((store) => void store.cache.set(key, item));
    },
    valueContainingKeys: keyList.filter((key) => get()?.cache?.has(key)),
  }));
}
