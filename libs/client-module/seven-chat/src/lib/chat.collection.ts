import {
  CollectionRef,
  FbTimestamp,
  firestore
} from '@hessed/client-lib/firebase';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { Nation } from '@hessed/client-module/seven-shared';
import firebase from 'firebase/app';
import { ChatLiveUser, ChatMessage, ChatRoom } from './model';
const CHAT = 'seven-chat';
const SEVEN_CHAT_MESSAGE = 'chat-message';
const CHAT_LIVE_USER = 'chat-live-user';

interface LanguageQueryArgs {
  lang: Nation;
  interests: ChatTagUnion[];
  ts: FbTimestamp;
}

export class Chat {
  public static get collection() {
    return firestore.collection(CHAT) as CollectionRef<ChatRoom>;
  }

  public static languageQuery({ lang, ts }: LanguageQueryArgs) {
    return Chat.collection
      .where('lang', '==', lang)
      .where('startTime', '>', ts);
    /* .where('tags', 'array-contains-any', interests); */ // Hmm... this should be optional?
  }

  public docRef: firebase.firestore.DocumentReference<ChatRoom>;
  public msgRef: firebase.firestore.CollectionReference<ChatMessage>;
  public liveUserRef: firebase.firestore.CollectionReference<ChatLiveUser>;

  constructor(roomId: string) {
    this.docRef = Chat.collection.doc(roomId);
    this.msgRef = this.docRef.collection(
      SEVEN_CHAT_MESSAGE
    ) as CollectionRef<ChatMessage>;
    this.liveUserRef = this.docRef.collection(
      CHAT_LIVE_USER
    ) as CollectionRef<ChatLiveUser>;
  }
}
