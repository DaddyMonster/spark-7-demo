import { Nation } from '@hessed/client-module/seven-shared';
import { useEffect, useRef, useState } from 'react';
import { Recognition } from './recognition';
interface UseRecognitionArgs {
  lang: Nation;
  onResult: (transcript: string) => void;
  onSpeechStart: () => void;
}

interface UseRecogChatReturn {
  recogOn: boolean;
  initRecognition: () => void;
  terminateRecognition: () => void;
}

export function useRecognition({
  lang,
  onResult,
  onSpeechStart,
}: UseRecognitionArgs): UseRecogChatReturn {
  const [recogOn, setrecogOn] = useState(false);

  const recogRef = useRef<Recognition>(null);

  useEffect(() => {
    return () => {
      if (recogRef.current) {
        recogRef.current.terminate();
        recogRef.current = null;
      }
    };
  }, []);

  const onTranscript = (transcript: string) => {
    onResult(transcript);
  };

  const onEnd = (transcript: string) => {
    if (!transcript) {
      onResult(null);
    }
  };

  const initRecognition = () => {
    recogRef.current = new Recognition({
      lang,
      onTranscript,
      onSpeechStart,
      onEnd,
    });
    recogRef.current.start();
  };

  const terminateRecognition = () => {
    if (!recogRef.current) {
      return;
    }
    recogRef.current.terminate();
    recogRef.current = null;
    setrecogOn(false);
  };

  return { initRecognition, terminateRecognition, recogOn };
}
