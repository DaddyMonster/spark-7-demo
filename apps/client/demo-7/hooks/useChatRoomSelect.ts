import { useMemo, useState } from 'react';
import {
  UserChatDetailProps,
  ChatRoomCacheKey,
} from '@hessed/client-module/seven-chat';

export const DEFAULT_CHAT_DETAIL = { cacheKey: null, selectedIdx: -1 };
type DetailInfoArgs = Omit<UserChatDetailProps, 'userInfo'>;

export function useChatRoomSelect() {
  const [detailInfos, setdetailInfos] = useState<DetailInfoArgs>(
    DEFAULT_CHAT_DETAIL
  );

  const handleRoomClick = (cacheKey: ChatRoomCacheKey, idx: number) => {
    console.log(cacheKey, idx);
    setdetailInfos({ cacheKey, selectedIdx: idx });
  };

  const resetDetail = () => {
    setdetailInfos(DEFAULT_CHAT_DETAIL);
  };

  return { handleRoomClick, detailInfos, resetDetail };
}
