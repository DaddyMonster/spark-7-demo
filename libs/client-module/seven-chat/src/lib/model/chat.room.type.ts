import { Nation } from '@hessed/client-module/seven-shared';
import { FbTimestamp } from '@hessed/client-lib/firebase';
import { ChatUser } from './chat.user.type';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';

export interface ChatRoom {
  topic: string;
  description: string;
  lang: Nation;
  hostId: string;
  createdAt: FbTimestamp;
  startTime: FbTimestamp;
  reserved: ChatUser[];
  host: SevenUserInfo;
  id: string;
  tags: ChatTagUnion[];
  userLangs: Nation[];
}
