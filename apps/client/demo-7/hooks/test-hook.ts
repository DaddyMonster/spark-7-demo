import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import { firestore } from '../lib/firebase-init';
import { nanoid } from 'nanoid';
import produce from 'immer';

const collection = firestore.collection('test');

export interface TestObject {
  name: string;
  age: number;
  hobby: 'eat' | 'code';
  createdAt: firebase.firestore.Timestamp;
}

export function useTestHook() {
  const [refs, setrefs] = useState<firebase.firestore.DocumentSnapshot[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { docs } = await collection.orderBy('createdAt').limitToLast(3).get();
    setrefs(docs);
  };

  const nameRef = useRef(0);

  const add = async () => {
    const id = nanoid();
    const item: TestObject = {
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      age: parseInt((Math.random() * Math.pow(10, 3)).toString()),
      name: 'Test Name' + nameRef.current,
      hobby: Math.random() * 2 > 0 ? 'eat' : 'code',
    };
    const ref = collection.doc(id);
    await ref.set(item);
  };

  const modify = async (idx: number, newName: string) => {
    const selectedRef = refs[idx];
    await selectedRef.ref.update({
      name: newName,
    });
    const updated = await selectedRef.ref.get();
    setrefs(
      produce((prev: firebase.firestore.DocumentSnapshot[]) => {
        prev[idx] = updated;
      })
    );
  };

  return { refs, add, modify };
}
