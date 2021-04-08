import { firestore } from '../lib/firebase-init';
import { Nation } from '../types/nation';
import { UserDetail } from './user-detail';
import firebase from 'firebase';
interface ReservedUser {
  photoURL: string | null;
  displayName: string;
  uid: string;
}

export interface ChatMeta {
  topic: string;
  description: string;
  lang: Nation;
  hostId: string;
  createdAt: firebase.firestore.Timestamp;
  startTime: firebase.firestore.Timestamp;
  reserved: ReservedUser[];
  host: UserDetail;
  id: string;
}

export const ChatMetaCollection = firestore.collection('chat-meta');
