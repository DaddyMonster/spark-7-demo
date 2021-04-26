import { createStore } from '@hessed/hook/store';

type HandsUpStore = {
  handUp: boolean;
  setHandUp: (uid: string) => void;
};

export const useHandsUpStore = createStore<HandsUpStore>((set) => ({
  handUp: false,
  setHandUp: (uid) => {
    // FB(uid)
    void {};
  },
}));
