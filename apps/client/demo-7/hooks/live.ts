import { ChatMeta } from '../model/chat-meta';
import dy from 'dayjs';
import firebase from 'firebase/app';
const mockItem: ChatMeta = {
  createdAt: firebase.firestore.Timestamp.fromDate(
    dy().subtract(15, 'minutes').toDate()
  ),
  description:
    'Cupidatat ullamco commodo eu culpa dolore sint magna nostrud enim cupidatat fugiat sunt eiusmod.',
  host: {
    displayName: 'Daniel',
    email: 'tioaosi@ajfkja.com',
    learningLang: ['ko'],
    localLang: 'en',
    registered: true,
    uid: 'asdjaisdjaisjd',
    photoURL: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
  hostId: 'asdjaisdjaisjd',
  id: 'sjiadjfiasjdf',
  lang: 'en',
  startTime: firebase.firestore.Timestamp.fromDate(
    dy().add(3, 'minutes').toDate()
  ),
  topic: "Let's talk about some fun stuff",
  reserved: Array(15).fill({
    uid: 'sodajdosdj',
    displayName: 'David',
    photoURL: 'https://material-ui.com/static/images/avatar/1.jpg',
  }),
};

interface useLiveReturn {
  chatMeta: ChatMeta;
}

export function useLive(): useLiveReturn {
  return { chatMeta: mockItem };
}
