import { createStore } from '../lib/createStore';
import { UserDetail } from '../model/user-detail';

type AuthStore = {
  userDetail: UserDetail | null;
  setUserDetail: (detail: UserDetail) => void;
};

export const useAuthStore = createStore<AuthStore>((set) => ({
  userDetail: null,
  setUserDetail: (detail: UserDetail) =>
    set((prev) => void (prev.userDetail = detail)),
}));
