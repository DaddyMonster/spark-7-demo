import { createStore } from '@hessed/hook/store';

type UseTranslationStore = {
  transOn: boolean;
  setTransOn: () => void;
};

export const useTranslationStore = createStore<UseTranslationStore>(
  (set, get) => ({
    transOn: false,
    setTransOn: () => set((store) => void (store.transOn = !get().transOn)),
  })
);
