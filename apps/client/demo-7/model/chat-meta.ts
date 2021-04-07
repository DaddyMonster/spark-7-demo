import { firestore } from '../lib/firebase-init';
import { Nation } from '../types/nation';
import { UserDetail } from './user-detail';

export interface ChatMetaInput {
  topic: string;
  description: string;
  lang: Nation;
  hostId: string;
  createdAt: Date;
  startTime: Date;
}

export interface ChatMeta extends ChatMetaInput {
  id: string;
}

export interface ChatMetaJoined extends ChatMeta {
  host: UserDetail;
}

export const ChatMetaCollection = firestore.collection('chat-meta');
