import { Nation } from '@hessed/client-module/seven-shared';
import { ClientRole } from 'agora-rtc-sdk-ng';

export interface ChatLiveUser {
  displayName: string;
  uid: string;
  photoURL: string;
  nation: Nation;
  role: ClientRole;
  liveUid: number;
}

export type ChatUser = Pick<
  ChatLiveUser,
  'uid' | 'photoURL' | 'nation' | 'role' | 'displayName'
>;
