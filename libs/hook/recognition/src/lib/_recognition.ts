import { Nation } from '@hessed/client-module/seven-shared';

type OnResult = (transcript: string) => void;

interface RecognitionArgs {
  onResult: OnResult;
  onSpeechStart: () => void;
  lang: Nation;
  continuous?: boolean;
}

export class Recognition {
  public recognizer: SpeechRecognition;
  private transcript: string = null;
  private onResult: OnResult;
  private onSpeechStart: () => void;
  private continuous: boolean;

  constructor({ lang, onResult, onSpeechStart, continuous }: RecognitionArgs) {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognizer = new SpeechRecognition();
    this.recognizer.lang = lang === 'en' ? 'en-US' : 'ko-KR';
    this.recognizer.maxAlternatives = 5;
    /* this. */
    this.onResult = onResult.bind(this);
    this.onSpeechStart = onSpeechStart.bind(this);
    this.initCallbacks();
    this.continuous = Boolean(continuous);
    if (this.continuous) {
      this.recognizer.onend = () => {
        this.start();
      };
    }
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
    console.log('STARTING RECOGNITION');
    this.recognizer.start();
  }

  private initCallbacks() {
    this.recognizer.onresult = (e) => {
      console.log('ON RESULT FIRED');
      const transcript = e.results[0][0].transcript;
      console.log('RECOGNITOIN RESULT', transcript);
      this.recognizer.stop();
      this.onResult(transcript);
    };
    this.recognizer.onspeechstart = this.onSpeechStart;
  }
}
