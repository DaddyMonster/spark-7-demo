import { firestore } from '../lib/firebase-init';
import { Nation } from '../types/nation';
import { UserDetail } from './user-detail';
import firebase from 'firebase';

export interface ChatUser {
  photoURL: string | null;
  displayName: string;
  uid: string;
  nation: Nation;
}

export interface LiveJoinedUser {
  displayName: string;
  uid: string;
  photoURL: string;
  isIn: boolean;
  nation: Nation;
  micOn: boolean;
}

export interface ChatMeta {
  topic: string;
  description: string;
  lang: Nation;
  hostId: string;
  createdAt: firebase.firestore.Timestamp;
  startTime: firebase.firestore.Timestamp;
  reserved: ChatUser[];
  liveUsers: LiveJoinedUser[];
  host: UserDetail;
  id: string;
}

export const ChatMetaCollection = firestore.collection('chat-meta');

export const AddLiveUser = async (id: string, userInfo: LiveJoinedUser) => {
  await ChatMetaCollection.doc(id).update({
    liveUsers: firebase.firestore.FieldValue.arrayUnion(userInfo),
  });
};

export const RemoveLiveUser = async (id: string, userInfo: LiveJoinedUser) => {
  if (!userInfo) {
    return;
  }
  const formatted: LiveJoinedUser = {
    ...userInfo,
    photoURL: userInfo.photoURL ?? '',
  };
  await ChatMetaCollection.doc(id).update({
    liveUsers: firebase.firestore.FieldValue.arrayRemove(formatted),
  });
};
