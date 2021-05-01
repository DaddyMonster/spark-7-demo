import { useEffect } from 'react';
import { Chat } from '@hessed/client-module/seven-chat';

interface UseChatOutProps {
  uid: string;
  roomId: string;
}

export function useChatOut({ uid, roomId }: UseChatOutProps) {
  useEffect(() => {
    return () => {
      if (!uid || !roomId) return;
      new Chat(roomId).liveUserRef.doc(uid).delete();
    };
  }, [uid, roomId]);
  return null;
}
