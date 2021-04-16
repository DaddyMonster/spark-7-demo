import { FbTimestamp } from '@hessed/client-lib/firebase';
import { Nation } from '@hessed/client-module/seven-shared';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';
export interface SevenUserInfo {
  localLang: Nation;
  learningLang: Nation;
  uid: string;
  registered: boolean;
  displayName: string;
  email: string;
  photoURL: string | null | undefined;
  followers: string[];
  createdAt: FbTimestamp;
  interests: ChatTagUnion[];
}

export type SevenUserRegisterInput = Pick<
  SevenUserInfo,
  'localLang' | 'learningLang' | 'interests'
>;
