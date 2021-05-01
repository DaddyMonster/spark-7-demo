import { createStore } from '@hessed/hook/store';
import React from 'react';

export type ChatSideOption = 'close-all' | 'userSide' | 'detailSide';

type UseChatSideStore = {
  userSide: boolean;
  detailSide: boolean;
  setSide: (side: ChatSideOption, e?: React.MouseEvent) => void;
};

export const useChatSideStore = createStore<UseChatSideStore>((set, get) => ({
  userSide: false,
  detailSide: false,
  setSide: (side, e) =>
    set((store) => {
      if (side === 'close-all' && e) {
        e.preventDefault();
        e.stopPropagation();
        store.userSide = false;
        store.detailSide = false;
        return;
      }
      store[side] = !get()[side];
      if (side !== 'detailSide' && get()['detailSide']) {
        store['detailSide'] = false;
      }

      if (side !== 'userSide' && get()['userSide']) {
        store['userSide'] = false;
      }
    }),
}));
