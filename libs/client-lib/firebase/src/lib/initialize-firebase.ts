import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDIwL1_7rXo8GH30Ue_VNmsa1nGF2THyv8',
  authDomain: 'hessed.firebaseapp.com',
  databaseURL: 'https://hessed-default-rtdb.firebaseio.com',
  projectId: 'hessed',
  storageBucket: 'hessed.appspot.com',
  messagingSenderId: '427061924743',
  appId: '1:427061924743:web:efcb71917b03af383fb922',
  measurementId: 'G-BFPYCVFF0C',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/* if (process.env.NODE_ENV !== 'production') {
  auth.useEmulator('http://localhost:6400');
  firestore.useEmulator('localhost', 6300);
} */
