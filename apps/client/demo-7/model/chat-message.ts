import { ChatUser } from './chat-meta';
import firebase from 'firebase/app';
import { firestore } from '../lib/firebase-init';
import { nanoid } from 'nanoid';

export interface ChatMessage {
  message: string;
  user: ChatUser;
  createdAt: firebase.firestore.Timestamp;
  roomId: string;
  id: string;
}
const chatSubCollectionPrefix = 'chat-';
export const ChatMessageCollection = firestore.collection('chat-message');

export const ChatMsgGroup = (metaId: string) =>
  firestore.collectionGroup(chatSubCollectionPrefix + metaId);

export const addChatToCollection = async (
  metaId: string,
  msg: Omit<ChatMessage, 'id'>
) => {
  const chatId = nanoid();
  await ChatMessageCollection.doc(chatId)
    .collection(chatSubCollectionPrefix + metaId)
    .add({ ...msg, id: chatId });
};

export const chatQuery = (metaId: string) => {
  if (!metaId) {
    return null;
  }
  return firestore
    .collectionGroup(chatSubCollectionPrefix + metaId)
    .orderBy('createdAt')
    .limitToLast(30);
};
