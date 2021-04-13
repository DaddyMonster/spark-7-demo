import firebase from 'firebase/app';
import { ChatUser, ChatMetaCollection } from './chat-meta';

export interface ChatMessage {
  message: string;
  user: ChatUser;
  createdAt: firebase.firestore.Timestamp;
  roomId: string;
  id: string;
  speaking: boolean;
  cloudVoice: string;
}

/* export const ChatMessageCollection = firestore.collection('chat-message'); */
export type ChatRef = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export const createChatRef = (chatMetaId: string, msgId: string): ChatRef => {
  return ChatMetaCollection.doc(chatMetaId)
    .collection('chat-message')
    .doc(msgId);
};

export const chatQuery = (metaId: string) => {
  if (!metaId) {
    return null;
  }
  return ChatMetaCollection.doc(metaId)
    .collection('chat-message')
    .orderBy('createdAt')
    .limitToLast(30);
};
