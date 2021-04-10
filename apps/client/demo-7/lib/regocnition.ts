import { Nation } from '../types/nation';

export class Recognition {
  public recognizer: SpeechRecognition;

  private transcript: string;

  constructor(private lang: Nation) {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.SpeechRecognition || (<any>window).webkitSpeechRecognition;
    this.recognizer = new SpeechRecognition();
    this.recognizer.lang = lang === 'en' ? 'en-US' : 'ko-KR';
    this.recognizer.interimResults = true;
    this.recognizer.maxAlternatives = 5;
    this.recognizer.onresult = (e) =>
      void (this.transcript = e.results[0][0].transcript);
  }

  public get getRecogLang() {
    return this.lang;
  }

  public terminate() {
    this.recognizer.abort();
  }

  public get currentTranscript() {
    return this.transcript;
  }
}
