import { Nation } from '@hessed/client-module/seven-shared';

type OnResult = (transcript: string) => void;

interface RecognitionArgs {
  lang?: Nation;
  onTranscript: OnResult;
  onStart?: () => void;
  onEnd?: OnResult;
  onSpeechStart?: () => void;
  continuse?: boolean;
}

export class Recognition {
  public recognizer: SpeechRecognition;
  private onTranscript: OnResult;
  private onEnd?: OnResult;
  private onStart?: () => void;
  private onSpeechStart?: () => void;
  private _transcript: string | null;
  private lang: Nation;
  public get transcript() {
    return this._transcript;
  }

  constructor({
    lang = 'en',
    onTranscript,
    onEnd,
    onStart,
    continuse = true,
    onSpeechStart,
  }: RecognitionArgs) {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.SpeechRecognition || (<any>window).webkitSpeechRecognition;
    this.recognizer = new SpeechRecognition();
    this.recognizer.lang = lang === 'en' ? 'en-US' : 'ko-KR';
    // NOT SUPPORTED ON CHROME ANDROID
    /* this.recognizer.interimResults = true; */
    this.onTranscript = onTranscript.bind(this);
    this.onEnd = onEnd?.bind(this);
    this.onStart = onStart?.bind(this);
    this.onSpeechStart = onSpeechStart?.bind(this);
    this.recognizer.maxAlternatives = 5;
    this.recognizer.onstart = () => {
      this._transcript = null;
      this.onStart && this.onStart();
    };
    this.recognizer.onend = () => {
      onEnd && onEnd(this._transcript);
      if (continuse) {
        this.recognizer.start();
      }
      this.resetTranscript();
    };
    this.recognizer.onresult = (e) => {
      if (e.results.item(0).isFinal) {
        const transcript = e.results[0][0].transcript;
        this._transcript = transcript || null;
        this.onTranscript(transcript);
      }
    };
    this.recognizer.onspeechstart = this.onSpeechStart;
  }

  public get getRecogLang() {
    return this.lang;
  }
  public start() {
    this.recognizer.start();
  }

  public stop() {
    this.recognizer.stop();
  }

  public terminate() {
    this.recognizer.stop();
    this.recognizer.abort();
  }

  public resetTranscript() {
    this._transcript = null;
  }
}
