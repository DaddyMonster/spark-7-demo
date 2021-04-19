import { Nation } from '@hessed/client-module/seven-shared';
import { useRef, useState } from 'react';
import { Recognition } from './recognition';
interface UseRecognitionArgs {
  lang: Nation;
  onResult: (transcript: string) => void;
  onSpeechStart: () => void;
}

interface UseRecogChatReturn {
  recogOn: boolean;
  initRecognition: () => void;
  stopRecognition: () => void;
}

export function useRecognition({
  lang,
  onResult,
  onSpeechStart,
}: UseRecognitionArgs): UseRecogChatReturn {
  const [recogOn, setrecogOn] = useState(false);

  const recogRef = useRef<Recognition>(null);

  const initRecognition = () => {
    recogRef.current = new Recognition({ lang, onResult, onSpeechStart });
    recogRef.current.start();
    setrecogOn(true);
  };
  const stopRecognition = () => {
    recogRef.current.terminate();
    recogRef.current = null;
    setrecogOn(false);
  };

  return { initRecognition, stopRecognition, recogOn };
}
