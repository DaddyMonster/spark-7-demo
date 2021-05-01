import { UseStore } from 'zustand';
import { AuthStoreState } from './auth-initializer-factory';

interface AuthFetchReturn<T, E> {
  data: T | null;
  error: E | null;
}

interface CreateAuthHookProps<A extends AuthStoreState<A>, L, R, RA> {
  store: UseStore<A>;
  loginLogic: () => Promise<AuthFetchReturn<A, L>>;
  onLoginError: (err: L) => void;
  registerLogic: (args: RA) => Promise<AuthFetchReturn<A, R>>;
  onRegisterError: (err: R) => void;
  logoutLogic: () => Promise<void>;
}

interface UseAuthHookReturn<A, RA> {
  login: () => void;
  register: (args: RA) => void;
  logout: () => void;
  user: A;
}

export function CreateAuthHook<A extends AuthStoreState<A>, L, R, RA>({
  store,
  loginLogic,
  logoutLogic,
  registerLogic,
  onLoginError,
  onRegisterError,
}: CreateAuthHookProps<A, L, R, RA>) {
  return function (): UseAuthHookReturn<A, RA> {
    const { setUser, user } = store();

    const login = async () => {
      const fetchedUser = await loginLogic();
      if (!fetchedUser.error) {
        onLoginError(fetchedUser.error);
        return;
      }
      setUser(fetchedUser.data);
    };

    const register = async (args: RA) => {
      const registered = await registerLogic(args);
      if (registered.error) {
        onRegisterError(registered.error);
        return;
      }
      setUser(registered.data);
    };

    const logout = async () => {
      await logoutLogic();
    };

    return { user, login, register, logout };
  };
}
