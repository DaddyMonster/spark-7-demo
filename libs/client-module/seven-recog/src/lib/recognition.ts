import { Nation } from '@hessed/client-module/seven-shared';

type OnResult = (transcript: string) => void;

interface RecognitionArgs {
  onResult: OnResult;
  onSpeechStart: () => void;
  lang: Nation;
}

export class Recognition {
  public recognizer: SpeechRecognition;
  private transcript: string = null;
  private onResult: OnResult;
  private onSpeechStart: () => void;
  constructor({ lang, onResult }: RecognitionArgs) {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognizer = new SpeechRecognition();
    this.recognizer.lang = lang === 'en' ? 'en-US' : 'ko-KR';
    this.recognizer.maxAlternatives = 5;
    this.onResult = onResult.bind(this);
    this.onSpeechStart = this.onSpeechStart.bind(this);
    this.initCallbacks();
  }

  public terminate() {
    this.recognizer.stop();
    this.recognizer.abort();
  }

  public get currentTranscript() {
    return this.transcript;
  }

  public resetTranscript() {
    this.transcript = null;
  }

  public start() {
    this.recognizer.start();
  }

  private initCallbacks() {
    this.recognizer.onresult = (e) => {
      console.log('ON RESULT FIRED');
      const transcript = e.results[0][0].transcript;
      console.log('RECOGNITOIN RESULT', transcript);
      this.onResult(transcript);
    };
    this.recognizer.onspeechstart = this.onSpeechStart;
  }
}
