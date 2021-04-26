import { createStore } from '@hessed/hook/store';

type UseHideChat = {
  hideChat: boolean;
  setHideChat: () => void;
};

export const useHideChatStore = createStore<UseHideChat>((set, get) => ({
  hideChat: false,
  setHideChat: () => set((store) => void (store.hideChat = !get().hideChat)),
}));
