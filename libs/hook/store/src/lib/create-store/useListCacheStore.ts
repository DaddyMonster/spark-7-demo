import { useEffect, useMemo, useRef, useState } from 'react';
import { UseStore } from 'zustand';
import { CreatedStore } from './cache-store-factory';

interface UseListCacheStoreProps<T, U extends string, F> {
  store: UseStore<CreatedStore<T[], U>>;
  key: U;
  ready: boolean;
  fetchNext?: (lastItem: T, paging: number) => Promise<T[]>;
  limit: number;
  fetchArgs: F;
}

export function useListCacheStore<T, U extends string, F>({
  store,
  key,
  ready,
  fetchNext,
  limit,
  fetchArgs,
}: UseListCacheStoreProps<T, U, F>) {
  const { cache, init, valueContainingKeys, flush, addToCache } = store();
  const [paging, setpaging] = useState(1);
  const [noMore, setnoMore] = useState(false);

  const currentListItem = useMemo(() => {
    if (!cache || !key) return [];
    const cached = cache.get(key);
    if (!cached) return [];
    const startLimit = (paging - 1) * limit;
    const endLimit = paging * limit;
    return (cached as T[]).slice(startLimit, endLimit);
  }, [cache, key, paging, limit]);

  const initRef = useRef(true);
  useEffect(() => {
    if (!ready || !initRef.current) return;
    if (!key || !store) {
      throw new Error(
        'NO KEY OR STORE PROVIDED KEY : ' + key + ', STORE : ' + store
      );
    }

    init(key, fetchArgs, limit);
    initRef.current = false;
  }, [ready, store, key, init, fetchArgs, limit]);

  const next = async () => {
    if (noMore || currentListItem.length === 0 || !fetchNext) return;

    const nextItems = await fetchNext(
      currentListItem[currentListItem.length - 1],
      paging
    );

    if (nextItems.length === 0) {
      setnoMore(true);
      return;
    }
    addToCache(key, nextItems);
    setpaging((prev) => prev + 1);
  };

  const prev = () => {
    if (paging === 1) {
      return;
    }
    setpaging((prev) => prev - 1);
  };
  return {
    list: currentListItem,
    next,
    prev,
    flush,
    loading: !valueContainingKeys.includes(key),
  };
}
