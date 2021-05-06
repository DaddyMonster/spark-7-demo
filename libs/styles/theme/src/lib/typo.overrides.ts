import { ClientTypes, TypoOptionsType } from '../types';

export const typoOptions: TypoOptionsType = {
  logo: "S-CoreDream-9Black, 'Roboto'",
  menu: "GmarketSansBold, 'Roboto'",
  guide: "GmarketSansMedium, 'Roboto'",
  text: "GmarketSansLight, 'Roboto'",
  pen: "KyoboHand, 'Roboto'",
  pretty: "S-CoreDream-5Medium, 'Roboto'",
  pretty2: "'Open Sans Condensed', 'sans-serif'",
};

type TypoOverride = {
  [key in ClientTypes]: Partial<TypoOptionsType>;
};

const typoOverride: TypoOverride = {
  'eng-spark': {},
  log: {
    menu: "'Noto Sans KR', sans-serif",
    guide: "'Noto Sans KR', sans-serif",
    text: "'Noto Sans KR', sans-serif",
  },
  seven: {},
  'spark-lite': {},
};

export const getOverridenTypoOption = (type: ClientTypes): TypoOptionsType => {
  return Object.assign(typoOptions, typoOverride[type]);
};

export default typoOptions;
