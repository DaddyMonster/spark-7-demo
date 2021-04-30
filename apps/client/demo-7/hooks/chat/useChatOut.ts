import { useEffect } from 'react';
import { Chat } from '../../../../../libs/client-module/seven-chat/src';

interface UseChatOutProps {
  uid: string;
  roomId: string;
}

export function useChatOut({ uid, roomId }: UseChatOutProps) {
  useEffect(() => {
    return () => {
      if (!uid || !roomId) return;
      handleUserOut();
    };
  }, [uid, roomId]);

  const handleUserOut = async () => {
    await new Chat(roomId).liveUserRef.doc(uid).delete();
  };
}
