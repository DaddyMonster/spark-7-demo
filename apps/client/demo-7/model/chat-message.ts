import firebase from 'firebase/app';
import { firestore } from '../lib/firebase-init';
import { ChatUser } from './chat-meta';

export interface ChatMessage {
  message: string;
  user: ChatUser;
  createdAt: firebase.firestore.Timestamp;
  roomId: string;
  id: string;
  speaking: boolean;
  cloudVoice: string;
}

const chatSubCollectionPrefix = 'chat-';
export const ChatMessageCollection = firestore.collection('chat-message');

export const ChatMsgGroup = (metaId: string) =>
  firestore.collectionGroup(chatSubCollectionPrefix + metaId);

export type ChatRef = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export const createChatRef = (chatId: string, metaId: string): ChatRef => {
  return ChatMessageCollection.doc(chatId)
    .collection(chatSubCollectionPrefix + metaId)
    .doc();
};

export const chatQuery = (metaId: string) => {
  if (!metaId) {
    return null;
  }
  return ChatMsgGroup(metaId).orderBy('createdAt').limitToLast(30);
};
