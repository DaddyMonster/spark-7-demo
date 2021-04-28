import { FbTimestamp } from '@hessed/client-lib/firebase';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { Nation } from '@hessed/client-module/seven-shared';
import { ClientRole } from 'agora-rtc-sdk-ng';

export interface ChatLiveUser {
  displayName: string;
  uid: string;
  photoURL: string;
  nation: Nation;
  role: ClientRole;
  liveUid: number;
  handUp: boolean;
  joinedAt: FbTimestamp;
  hasLeft: boolean;
}

export type ChatUser = Pick<
  ChatLiveUser,
  'uid' | 'photoURL' | 'nation' | 'displayName'
>;

export const getChatUserFromInfo = (info: SevenUserInfo): ChatUser => {
  const { uid, photoURL, localLang, displayName } = info;
  return { uid, photoURL, nation: localLang, displayName };
};
