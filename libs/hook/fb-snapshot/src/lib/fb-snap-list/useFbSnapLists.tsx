import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { QueryRef, QuerySnap, FbError } from '@hessed/client-lib/firebase';

export type Snap<T> = (
  onNext: (snapshot: QuerySnap<T>) => void,
  onError?: (error: FbError) => void,
  onCompletion?: () => void
) => () => void;

interface UseFbSnapListsProps<T> {
  queryRef: QueryRef<T>;
  limit?: number;
  toLast?: boolean;
}

export function useFbSnapLists<T>({
  queryRef,
  limit = 30,
  toLast = true,
}: UseFbSnapListsProps<T>): [T[], FbError] {
  const [list, setlist] = useState<T[]>([]);
  const [err, seterr] = useState<FbError | null>(null);
  const currentQueryRef = useRef<ReturnType<Snap<T>>>(null);

  useEffect(() => {
    if (!queryRef) {
      return;
    }

    currentQueryRef.current = queryRef[toLast ? 'limitToLast' : 'limit'](
      limit
    ).onSnapshot(
      (lists) => setlist(lists.docs.map((x) => x.data())),
      (err) => seterr(err)
    );
    return () => {
      if (currentQueryRef.current) {
        currentQueryRef.current();
        currentQueryRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryRef]);

  return [list, err];
}
