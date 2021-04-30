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
  terminateRecognition: () => void;
}

export function useRecognition({
  lang,
  onResult,
  onSpeechStart,
}: UseRecognitionArgs): UseRecogChatReturn {
  const [recogOn, setrecogOn] = useState(false);

  const recogRef = useRef<Recognition>(null);

  const initRecognition = () => {
    recogRef.current = new Recognition(lang);
    const recog = recogRef.current.recognizer;
    recog.onspeechstart = onSpeechStart;
    recog.onstart = () => {
      console.log('Speech Started');
      setrecogOn(true);
    };
    recog.onspeechend = () => {
      console.log('Speech Ended');
      setrecogOn(false);
    };
    recog.onend = () => {
      console.log('RECOGNITION ON END CALLED');
      const transcript = recogRef.current.currentTranscript;
      onResult(transcript ? transcript.slice(0) : undefined);
      recogRef.current.resetTranscript();
      recog.start();
    };
    recog.start();
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
