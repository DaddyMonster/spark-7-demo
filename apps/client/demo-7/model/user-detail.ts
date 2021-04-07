import { firestore } from '../lib/firebase-init';
import { Nation } from '../types/nation';

export interface UserDetail {
  uid: string;
  registered: boolean;
  localLang: Nation;
  learningLang: Nation[];
  displayName: string;
  email: string;
  photoURL: string;
}

export const UserCollection = firestore.collection('user-detail');
