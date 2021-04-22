import { FbTimestamp, QueryRef } from '@hessed/client-lib/firebase';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DocSnapshot,
  useChatListStore,
  ChatRoomCacheKey,
} from './useChatListStore';

interface UseChatListProps {
  listQuery: ((startTime: FbTimestamp) => QueryRef) | null;
  paging?: number;
  queryCacheKey: ChatRoomCacheKey;
}

interface UseChatListReturn {
  refList: DocSnapshot[];
  cursor: number;
  next: () => void;
  prev: () => void;
  loading: boolean;
}

export function useChatList(
  { listQuery, paging = 5, queryCacheKey }: UseChatListProps,
  dep = true
): UseChatListReturn {
  if (!dep) {
    return null;
  }

  const [cursor, setcursor] = useState(1);
  const { addCache, cache, getCache } = useChatListStore();
  const [loading, setloading] = useState(true);
  const maxReached = useRef(-1);
  const queryRef = useRef<QueryRef>(null);

  const cachedItems = useMemo(() => cache.get(queryCacheKey), [
    queryCacheKey,
    cache,
  ]);

  const refList = useMemo(() => {
    if (!cachedItems) {
      return [];
    }
    const { list } = cachedItems;
    const start = (cursor - 1) * paging;
    const end = cursor * paging;
    return list.slice(start, end);
  }, [cache, cursor, paging]);

  useEffect(() => {
    if (!listQuery) return;
    const fbNow = FbTimestamp.fromDate(new Date());
    queryRef.current = listQuery(fbNow);
    initFetch();
  }, [listQuery]);

  const initFetch = async () => {
    const cached = getCache(queryCacheKey);
    if (cached) {
      return;
    }
    const { docs } = await queryRef.current.limit(paging).get();
    addCache(queryCacheKey, docs);
  };

  const next = async () => {
    if (cachedItems && cachedItems.list.length > cursor * paging) {
      setcursor(cursor + 1);
      return;
    }
    if (maxReached.current >= cursor) return;
    setloading(true);
    const { docs } = await queryRef.current
      .startAt(cachedItems.list[cachedItems.list.length - 1])
      .limit(paging)
      .get();

    if (docs.length < paging) {
      maxReached.current = cursor + 1;
    }
    addCache(queryCacheKey, docs);
    setcursor((prev) => prev + 1);
    setloading(false);
  };

  const prev = () => {
    if (cursor <= 1) {
      return;
    }
    setcursor((prev) => prev - 1);
  };

  return { next, prev, refList, loading, cursor };
}
