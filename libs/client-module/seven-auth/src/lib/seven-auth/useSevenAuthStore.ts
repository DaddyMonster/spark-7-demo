import { createStore } from '@hessed/hook/store';
import { SevenUserInfo } from './model/seven-user.type';

type AuthStore = {
  user: SevenUserInfo | null;
  setUser: (userDoc: SevenUserInfo) => void;
};

export const useSevenAuthStore = createStore<AuthStore>((set) => ({
  user: null,
  setUser: (doc) => set((prev) => void (prev.user = doc)),
}));
