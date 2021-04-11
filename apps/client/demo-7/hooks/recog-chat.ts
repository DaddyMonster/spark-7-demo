import dy from 'dayjs';
import utc from 'dayjs/plugin/utc';
import firebase from 'firebase/app';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import { Recognition } from '../lib/regocnition';
import { ChatRef, createChatRef } from '../model/chat-message';
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
  const [recogOn, setRecogOn] = useState(false);
  const recogRef = useRef<Recognition>(null);
  const chatRef = useRef<ChatRef | null>(null);

  useEffect(() => {
    return () => stopRecognition();
  }, []);

  const handleSpeechEnd = async (transcript: string) => {
    if (!chatRef.current) {
      console.log('NO CHAT REF!', chatRef.current);
      setmsgStatus('pending');
      return;
    }
    setmsgStatus('sending');
    await chatRef.current.update({ transcript });
    setmsgStatus('pending');
    chatRef.current = null;
  };

  const onEnd = () => {
    const transcript = recogRef.current.currentTranscript;
    console.log('ON END TRANSCRIPT', transcript);

    if (transcript && chatRef.current) {
      handleSpeechEnd(transcript);
    }
    if (!transcript) {
      chatRef?.current?.delete();
      chatRef.current = null;
    }
    recogRef.current.resetTranscript();
    recogRef.current.recognizer.start();
  };

  const onSpeechStart = async () => {
    setmsgStatus('recognizing');
    const chatId = nanoid();
    chatRef.current = await createChatRef(chatId);
    const { displayName, localLang, photoURL, uid } = user;
    await chatRef.current.collection(metaId).add({
      createdAt: firebase.firestore.Timestamp.fromDate(dy().toDate()),
      id: chatId,
      message: '...',
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
