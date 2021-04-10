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

export const addRecogChatToCollection = async (
  metaId: string,
  // TMEP!!!!
  chatMsg: Omit<ChatMessage, 'cloudVoice'>
) => {
  await ChatMessageCollection.doc(chatMsg.id)
    .collection(chatSubCollectionPrefix + metaId)
    .add({ ...chatMsg, cloudVoice: '' });
};

export const updateChatMessage = async (chatId: string, message: string) => {
  await ChatMessageCollection.doc(chatId).update({ message, speaking: false });
};

export const chatQuery = (metaId: string) => {
  if (!metaId) {
    return null;
  }
  return ChatMsgGroup(metaId).orderBy('createdAt').limitToLast(30);
};
