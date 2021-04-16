import { ChatUser } from './chat.user.type';
import { FbTimestamp } from '@hessed/client-lib/firebase';

export interface ChatMessage {
  message: string;
  user: ChatUser;
  createdAt: FbTimestamp;
  roomId: string;
  id: string;
  cloudVoiceURL: string;
}
