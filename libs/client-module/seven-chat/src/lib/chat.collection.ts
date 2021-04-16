import firebase from 'firebase/app';
import { firestore } from '@hessed/client-lib/firebase';
import { nanoid } from 'nanoid';
import { ChatMessage } from './model';

const CHAT = 'seven-chat';
const SEVEN_CHAT_MESSAGE = 'chat-message';
const CHAT_LIVE_USER = 'chat-live-user';

export class Chat {
  static get collection() {
    return firestore.collection(CHAT);
  }
  public docRef: firebase.firestore.DocumentReference;
  public msgRef: firebase.firestore.CollectionReference;
  public liveUserRef: firebase.firestore.CollectionReference;

  constructor(roomId: string) {
    this.docRef = Chat.collection.doc(roomId);
    this.msgRef = this.docRef.collection(SEVEN_CHAT_MESSAGE);
    this.liveUserRef = this.docRef.collection(CHAT_LIVE_USER);
  }
}
