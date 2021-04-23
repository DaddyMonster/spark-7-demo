import { FbTimestamp, firestore } from '@hessed/client-lib/firebase';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { Nation } from '@hessed/client-module/seven-shared';
import dy from 'dayjs';
import firebase from 'firebase/app';

const CHAT = 'seven-chat';
const SEVEN_CHAT_MESSAGE = 'chat-message';
const CHAT_LIVE_USER = 'chat-live-user';

interface LanguageQueryArgs {
  lang: Nation;
  interests: ChatTagUnion[];
  ts: FbTimestamp;
}

export class Chat {
  static get collection() {
    return firestore.collection(CHAT);
  }

  public static languageQuery({ interests, lang, ts }: LanguageQueryArgs) {
    return Chat.collection
      .where('lang', '==', lang)
      .where('startTime', '>', ts)
      /* .where('tags', 'array-contains-any', interests); */ // Hmm... this should be optional?
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
