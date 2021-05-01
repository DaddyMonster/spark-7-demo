export const stepKeys = [
  'localLang',
  'learningLang',
  'interests',
  'goApp',
] as const;
export type StepKey = typeof stepKeys[number];
export type MoreInfoMessage = {
  [key in StepKey]: string;
};
