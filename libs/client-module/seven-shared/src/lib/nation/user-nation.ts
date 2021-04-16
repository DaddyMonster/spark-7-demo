export type Nation = 'en' | 'ko';

export type NationCodeMap = {
  [key in Nation]: string;
};

export const nationCodeMap: NationCodeMap = {
  en: 'en-US',
  ko: 'ko-KR',
};
