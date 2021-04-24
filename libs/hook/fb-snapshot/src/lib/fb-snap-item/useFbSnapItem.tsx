import React, { useEffect, useRef, useState } from 'react';
import { DocRef, DocSnap, FbError } from '@hessed/client-lib/firebase';
import Fb from 'firebase/app';

type Snap<T> = (
  onNext: (snapshot: DocSnap<T>) => void,
  onError?: (error: FbError) => void,
  onCompletion?: () => void
) => () => void;

export interface UseFbSnapItemProps {
  docRef: DocRef | null;
}

export function useFbSnapItem<T>({ docRef }: UseFbSnapItemProps): [T, FbError] {
  const [doc, setdoc] = useState(null);
  const [err, seterr] = useState<Fb.firestore.FirestoreError | null>(null);
  const currentDocRef = useRef<ReturnType<Snap<T>>>(null);

  useEffect(() => {
    if (!docRef) {
      return;
    }
    currentDocRef.current = docRef.onSnapshot(
      (item) => setdoc(item.data()),
      (err) => seterr(err)
    );

    return () => {
      if (currentDocRef.current) {
        currentDocRef.current();
        currentDocRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docRef]);

  return [doc, err];
}
