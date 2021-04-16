const profession = [
  'Developer',
  'Designer',
  'Armed forces',
  'Management',
  'Consulting',
] as const;

const business = [
  'Start up',
  'IT Industry',
  'Leadership',
  'Finance',
  'Crypto',
] as const;

const life = ['Longevity', 'Culture', 'Philosophy'] as const;

const interests = [
  'Economy',
  'Art',
  'Fashion',
  'Sports',
  'Internationalism',
  'Music',
  'Travel',
  'Movies',
  'Food',
  'Novel',
  'Book',
  'Non Fiction',
  'Trend',
  'Social',
  'Video Game',
  'VR',
  'Technology',
  'Vehicle',
  'Children',
  'Pet',
] as const;

export type ChatTagUnion =
  | typeof profession[number]
  | typeof business[number]
  | typeof life[number]
  | typeof interests[number];

const merged: ChatTagUnion[] = [].concat(profession, business, life, interests);

export interface TagChatSelection {
  id: ChatTagUnion;
  selected: boolean;
  translation: string;
}

export const tagMap = merged.map(
  (x): TagChatSelection => {
    return {
      id: x,
      translation: '', //i18n here!
      selected: false,
    };
  }
);
