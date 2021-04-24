import firebase from 'firebase/app';

export type DocRef = firebase.firestore.DocumentReference;
export type CollectionRef = firebase.firestore.CollectionReference;
export type QueryRef<T> = firebase.firestore.Query<T>;
export type DocSnap<T> = firebase.firestore.DocumentSnapshot<T>;
export type QuerySnap<T> = firebase.firestore.QuerySnapshot<T>;
export type FbError = firebase.firestore.FirestoreError;
