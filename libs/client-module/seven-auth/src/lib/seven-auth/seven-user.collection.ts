import { CollectionRef, DocRef, firestore } from '@hessed/client-lib/firebase';
import firebase from 'firebase/app';
const USER_COLLECTION = 'seven-user';
const USER_CHAT_BAG = 'chat-bag';

export class SevenUser {
  private uid: string;

  public static get collection() {
    return firestore.collection(USER_COLLECTION);
  }

  constructor(uid: string) {
    this.uid = uid;
  }

  public get userInfoRef(): DocRef {
    return SevenUser.collection.doc(this.uid);
  }

  public get userChatBags(): CollectionRef {
    return this.userInfoRef.collection(USER_CHAT_BAG);
  }

  public getFollowersQuery(followers: string[]): firebase.firestore.Query {
    return SevenUser.collection.where('uid', 'array-contains', followers);
  }
}
