/* import { FbTimestamp, QueryRef } from '@hessed/client-lib/firebase';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { Nation } from '@hessed/client-module/seven-shared';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Chat } from './chat.collection';
import { ChatRoom } from './model';
import { CacheKey, useChatRoomStore } from './useChatRoomStore';
export enum QueryType {
  ByTag,
  Reserved,
  Follower,
  Hosting,
}

interface UseChatRoomListArgs {
  userInfo: SevenUserInfo;
  queryType: QueryType;
  lang?: Nation;
}

interface QueryReturn<T = unknown> {
  query: QueryFunction<T>;
  queryArg: T;
}

interface ByTagArgs {
  tags: ChatTagUnion;
  lang?: Nation;
}
type CursorBy = 'increase' | 'decrease';
type QueryFunction<T> = (queryArg: T, cursor: number) => QueryRef;
type SetCursor = (by: CursorBy) => void;
type UseChatRoomListReturn = [ChatRoom[], SetCursor];

const CURSOR_LIMIT = 10;

export function useChatRoomList({
  queryType,
  userInfo,
  lang,
}: UseChatRoomListArgs): UseChatRoomListReturn {
  const { addCache, cache, sanitizeCache } = useChatRoomStore();
  const [cursor, setcursor] = useState(1);
  const prevQueryType = useRef<QueryType>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      sanitizeCache();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const queryKey = useMemo(() => {
    if (!queryType || !userInfo) {
      return null;
    }
    const { query, queryArg } = getQuery(queryType);
    const cacheKey: CacheKey = {
      args: queryArg,
      cursor,
      type: queryType,
    };
    return { cacheKey, query, queryArg };
  }, [queryType, userInfo, cursor]);

  useEffect(() => {
    if (!queryKey) {
      return;
    }
    const { cacheKey, query, queryArg } = queryKey;
    handleFetch(cacheKey, query(queryArg, cursor));
  }, [queryKey]);

  const list: ChatRoom[] = useMemo(() => {
    if (!queryKey) {
      return [];
    }
    const { cacheKey } = queryKey;
    const docs = cache.get(cacheKey);
    if (!docs) {
      return [];
    }
    return docs.roomList.map((x) => x.data() as ChatRoom);
  }, [cache]);

  const getQuery = (queryType: QueryType): QueryReturn => {
    switch (queryType) {
      case QueryType.ByTag:
        return {
          query: byTag,
          queryArg: {
            tags: userInfo.interests,
            lang,
          },
        };
      case QueryType.Follower:
        return { query: byFollower, queryArg: userInfo.followers };
      case QueryType.Hosting:
        return { query: byHosting, queryArg: userInfo.uid };
      case QueryType.Reserved:
        return { query: byReserved, queryArg: userInfo.uid };
      default:
        throw new Error('QueryType was not provided');
    }
  };

  const byTag = ({ tags, lang }: ByTagArgs) => {
    return Chat.collection
      .where('tags', 'array-contains-any', tags)
      .where('lang', '==', lang);
  };
  const byReserved = (uid: string) => {
    return Chat.collection.where('reserved', 'array-contains', uid);
  };
  const byFollower = (uids: string[]) => {
    return Chat.collection.where('hostId', 'in', uids);
  };
  const byHosting = (uid: string) => {
    return Chat.collection.where('hostId', '==', uid);
  };

  const handleFetch = async (cacheKey: CacheKey, queryRef: QueryRef) => {
    const cached = cache.get(cacheKey);
    if (cached) return cached.roomList;
    const fbNow = FbTimestamp.fromDate(new Date());
    const sameTypePrev = prevQueryType.current === cacheKey.type;

    const prevCached = sameTypePrev
      ? cache.get({ ...cacheKey, cursor: cursor - 1 })
      : null;

    const query = queryRef
      .where('startTime', '<', fbNow)
      .orderBy('startTime')
      .startAt(
        prevCached?.roomList[prevCached?.roomList.length - 1] ?? 'startTime'
      )
      .limit(CURSOR_LIMIT);

    if (!sameTypePrev) {
      prevQueryType.current = cacheKey.type;
    }

    const { docs } = await query.get();
    addCache(cacheKey, docs);
    return docs;
  };

  const setCursor = (by: CursorBy) => {
    const factor = by === 'increase' ? 1 : -1;
    setcursor((prev) => prev + factor);
  };

  const retrive = (idx: number) => {
    const selected = cache.get(queryKey.cacheKey);
    if (!selected) return null;
    return selected.roomList[idx];
  };

  return [list, setCursor];
}
 */