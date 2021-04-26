import { ChatUser } from './chat.user.type';
import { FbTimestamp } from '@hessed/client-lib/firebase';
import { nationList, Nation } from '@hessed/client-module/seven-shared';
type TranslatedMessage = {
  [key in Nation]: string;
};

export const defaultTranslated: TranslatedMessage = nationList.reduce(
  (acc, cur: Nation) => {
    return Object.assign(acc, { [cur]: '...' });
  },
  {} as TranslatedMessage
);

export interface ChatMessage {
  message: string;
  user: ChatUser & { clientUid: string };
  createdAt: FbTimestamp;
  roomId: string;
  id: string;
  cloudVoiceURL: string;
  translations: TranslatedMessage;
}
