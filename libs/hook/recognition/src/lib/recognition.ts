import { Nation } from '@hessed/client-module/seven-shared';

export class Recognition {
  public recognizer: SpeechRecognition;

  private transcript: string = null;

  constructor(private lang: Nation) {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.SpeechRecognition || (<any>window).webkitSpeechRecognition;
    this.recognizer = new SpeechRecognition();
    this.recognizer.lang = lang === 'en' ? 'en-US' : 'ko-KR';
    /* this.recognizer.interimResults = true; */
    this.recognizer.maxAlternatives = 5;
    this.recognizer.onresult = (e) => {
      this.transcript = e.results[0][0].transcript;
      console.log('RECOG INTERIM RESULT', this.transcript);
    };
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

  public resetTranscript() {
    this.transcript = null;
  }
}
