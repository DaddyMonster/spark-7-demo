import dy from 'dayjs';
import utc from 'dayjs/plugin/utc';
import firebase from 'firebase/app';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import { Recognition } from '../lib/regocnition';
import {
  addRecogChatToCollection,
  updateChatMessage,
} from '../model/chat-message';
import { UserDetail } from '../model/user-detail';
import { Nation } from '../types/nation';
dy.extend(utc);

interface UseRecogChatArgs {
  lang: Nation | null;
  metaId: string;
  user: UserDetail;
}

type MsgStatus = 'pending' | 'recognizing' | 'sending';
interface UseRecogChatReturn {
  msgStatus: MsgStatus;
  recogOn: boolean;
  initRecognition: () => void;
  stopRecognition: () => void;
}

const sleep = (timeInSec: number) => {
  return new Promise((res) => {
    setTimeout(() => res({}), timeInSec * 1000);
  });
};

export function useRecogChat({
  metaId,
  user,
}: UseRecogChatArgs): UseRecogChatReturn {
  const [msgStatus, setmsgStatus] = useState<MsgStatus>('pending');
  const [currentChatId, setcurrentChatId] = useState<string | null>(null);
  const [recogOn, setRecogOn] = useState(false);
  const recogRef = useRef<Recognition>(null);

  useEffect(() => {
    return () => stopRecognition();
  }, []);

  const handleSpeechEnd = async (result: SpeechRecognitionResult) => {
    const { transcript } = result.item(0);
    if (!currentChatId) {
      setmsgStatus('pending');
      return;
    }
    setmsgStatus('sending');
    await updateChatMessage(currentChatId, transcript);
    setmsgStatus('pending');
    setcurrentChatId(null);
  };

  const onEnd = (e: SpeechRecognitionEvent) => {
    if (e.results?.item(0)) {
      handleSpeechEnd(e.results.item(0));
    }
    recogRef.current.recognizer.start();
  };

  const onSpeechStart = async () => {
    console.log('SPEECH STARTED');
    await sleep(2);
    if (!recogRef.current.currentTranscript) {
      console.log('NO WORDS HAS BEEN RECOGNIZED, MESSAGE NOT SENT');
      return;
    }
    setmsgStatus('recognizing');
    const chatId = nanoid();
    setcurrentChatId(chatId);
    const { displayName, localLang, photoURL, uid } = user;
    await addRecogChatToCollection(metaId, {
      createdAt: firebase.firestore.Timestamp.fromDate(dy().toDate()),
      id: chatId,
      message: '',
      roomId: metaId,
      speaking: true,
      user: { displayName, photoURL: photoURL ?? '', uid, nation: localLang },
    });
  };

  const initRecognition = () => {
    recogRef.current = new Recognition(user.localLang);
    const recog = recogRef.current.recognizer;
    recog.onspeechstart = onSpeechStart;
    recog.onstart = () => {
      console.log('RECOG HAS STARTED');
      setRecogOn(true);
    };
    recog.onspeechend = () => console.log('SPEECH ENDED');
    recog.onend = onEnd;
    recog.start();
  };

  const stopRecognition = () => {
    if (recogRef.current) {
      recogRef.current.terminate();
      recogRef.current = null;
      setRecogOn(false);
    }
  };

  return { msgStatus, initRecognition, stopRecognition, recogOn };
}
