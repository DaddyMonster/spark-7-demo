import {
  CollectionRef,
  FbError,
  QueryRef,
  QuerySnap,
} from '@hessed/client-lib/firebase';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UseStore } from 'zustand';
export type Snap<T> = (
  onNext: (snapshot: QuerySnap<T>) => void,
  onError?: (error: FbError) => void,
  onCompletion?: () => void
) => () => void;

type ListStore<T> = {
  state: T[];
  setter: (val: T[]) => void;
  err: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
interface UseFbSnapListsProps<T> {
  queryRef: QueryRef<T> | CollectionRef<T>;
  limit?: number;
  toLast?: boolean;
  globalStore?: UseStore<ListStore<T>>;
}

export function useFbSnapLists<T>({
  queryRef,
  limit = 30,
  toLast = true,
  globalStore,
}: UseFbSnapListsProps<T>): [T[], FbError] {
  const [list, setlist] = useState<T[]>([]);
  const [err, seterr] = useState<FbError | null>(null);
  const currentQueryRef = useRef<ReturnType<Snap<T>>>(null);
  const globalState = globalStore ? globalStore() : null;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isGlobal = useMemo(() => Boolean(globalState) && Boolean(globalState), [
    globalState,
    globalStore,
  ]);

  useEffect(() => {
    if (!queryRef) {
      return;
    }

    const setter = isGlobal ? globalState.setter : setlist;

    currentQueryRef.current = queryRef[toLast ? 'limitToLast' : 'limit'](
      limit
    ).onSnapshot(
      (lists) => setter(lists.docs.map((x) => x.data())),
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
