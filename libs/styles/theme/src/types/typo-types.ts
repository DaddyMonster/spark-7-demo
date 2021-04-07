export type TypoUnion =
  | 'logo'
  | 'menu'
  | 'guide'
  | 'text'
  | 'pen'
  | 'pretty'
  | 'pretty2';

export type TypoOptionsType = {
  [key in TypoUnion]: string;
};
