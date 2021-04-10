import { omit } from 'ramda';
import { ChatMessage } from '../model/chat-message';
import { createStore } from '../lib/createStore';

export type SelectedChatMsg = Omit<ChatMessage, 'speaking'>;

type UseChatSelectionStore = {
  selectedChatMsg: SelectedChatMsg | null;
  /* cloudAudioURL: string; */
  setSelectedChatMsg: (msg?: ChatMessage) => void;
};

export const useChatSelectionStore = createStore<UseChatSelectionStore>(
  (set) => ({
    selectedChatMsg: null,
    translated: null,
    setSelectedChatMsg: (msg) => {
      if (!msg?.message) {
        set((prev) => void (prev.selectedChatMsg = null));
      }
      set((prev) => {
        prev.selectedChatMsg = omit(['speaking'], msg);
      });
    },
  })
);
