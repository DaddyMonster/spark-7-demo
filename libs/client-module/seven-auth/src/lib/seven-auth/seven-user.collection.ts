import {
  CollectionRef,
  DocRef,
  DocSnap,
  firestore,
  QueryRef,
} from '@hessed/client-lib/firebase';
import firebase from 'firebase/app';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { SevenUserInfo } from './model';
const USER_COLLECTION = 'seven-user';
const USER_CHAT_BAG = 'chat-bag';

export class SevenUser {
  private uid: string;

  public static get collection() {
    return firestore.collection(
      USER_COLLECTION
    ) as CollectionRef<SevenUserInfo>;
  }

  public static async recommaded(
    interests: ChatTagUnion[],
    limit: number,
    lastItem?: DocRef
  ) {
    const lastItemChain = (q: QueryRef, lastItem?: DocRef) => {
      return lastItem ? q.startAfter(lastItem) : q;
    };

    return await lastItemChain(
      SevenUser.collection
        .where('interests', 'array-contains-any', interests)
        .orderBy('lastLogged'),
      lastItem
    )
      .limit(limit)
      .get()
      .then((x) => x.docs as DocSnap<SevenUserInfo>[]);
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

  public getFollowersQuery(follows: string[]): firebase.firestore.Query {
    return SevenUser.collection.where('uid', 'array-contains', follows);
  }
}
