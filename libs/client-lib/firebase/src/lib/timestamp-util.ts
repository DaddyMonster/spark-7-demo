import firebase from 'firebase/app';

export const toFbTime = (date: Date) => {
  return firebase.firestore.Timestamp.fromDate(date);
};

export class FbTimestamp extends firebase.firestore.Timestamp {
  // Time comparison 등등 필요 함수들 정의
}
