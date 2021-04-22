export const nationList = ['en', 'ko'] as const;

export type Nation = typeof nationList[number];

export type NationCodeMap = {
  [key in Nation]: string;
};

export const nationCodeMap: NationCodeMap = {
  en: 'en-US',
  ko: 'ko-KR',
};

export const nationCodeLabel: NationCodeMap = {
  en: 'nation-label-en',
  ko: 'nation-label-ko',
};

interface NationMapItem {
  code: Nation;
  iconPath: string;
  label: string;
}

export const nationMapList: NationMapItem[] = [
  {
    code: 'en',
    iconPath: '/flags/us.svg',
    label: 'English',
  },
  {
    code: 'ko',
    iconPath: '/flags/kr.svg',
    label: 'Korea',
  },
];
