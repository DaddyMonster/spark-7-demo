import { useMemo } from 'react';
import { DocSnap } from './firestore-reference';

export interface UseRefToListProps<T> {
  snapList: DocSnap<T>[];
}

export function useRefToList<T>({ snapList }: UseRefToListProps<T>) {
  const list = useMemo(() => {
    if (!snapList) return [];

    return snapList.map((x) => x.data());
  }, [snapList]);

  return list;
}
