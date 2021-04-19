import { ChatUser } from './chat-meta';
import firebase from 'firebase/app';

export interface LiveMessage {
  message: string;
  transcript: string;
  user: ChatUser;
  timeStamp: firebase.firestore.Timestamp;
}
