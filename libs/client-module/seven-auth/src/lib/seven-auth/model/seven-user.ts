import { Nation } from './nation';
import { firestore } from '@hessed/client-lib/firebase';
export interface SevenUserInfo {
  localLang: Nation;
  learningLang: Nation;
  uid: string;
  registered: boolean;
  displayName: string;
  email: string;
  photoURL: string | null | undefined;
}

export const SevenUserInfoCollection = firestore.collection('seven-user');
