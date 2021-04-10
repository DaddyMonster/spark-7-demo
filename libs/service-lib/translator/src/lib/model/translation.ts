export class DetectedLanguage {
  language: 'en' | 'ko';
  score: number;
}

export class Translated {
  text: string;
  to: 'en' | 'ko';
}

export class Translation {
  detectedLanguage: DetectedLanguage;
  translations: Translated[];
}
