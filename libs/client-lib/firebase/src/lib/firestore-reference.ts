import firebase from 'firebase/app';
export type DocData = firebase.firestore.DocumentData;
export type DocRef<T = DocData> = firebase.firestore.DocumentReference<T>;
export type CollectionRef<
  T = DocData
> = firebase.firestore.CollectionReference<T>;
export type QueryRef<T = DocData> = firebase.firestore.Query<T>;
export type DocSnap<T = DocData> = firebase.firestore.DocumentSnapshot<T>;
export type QuerySnap<T = DocData> = firebase.firestore.QuerySnapshot<T>;
export type FbError = firebase.firestore.FirestoreError;
export const ArrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const ArrayRemove = firebase.firestore.FieldValue.arrayRemove;
export const Increment = firebase.firestore.FieldValue.increment;
