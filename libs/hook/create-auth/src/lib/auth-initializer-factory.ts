/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useRef, useState } from 'react';
import { UseStore } from 'zustand';
/* import { logger } from '@hessed/ui/web/util'; */
interface IUser {
  uid: string;
}

interface IOAuthState {
  uid: string | null;
  loading: boolean;
}

interface BaseRouter {
  asPath: string;
  push: (path: string) => void;
}

export type AuthStoreState<T> = {
  user: T | null;
  setUser: (user: T) => void;
};

type Fetcher<T> = (id?: string) => Promise<T>;

interface CreateUseAuthInitializerProps<
  U extends IUser,
  A extends AuthStoreState<unknown>,
  R extends BaseRouter
> {
  urlToKickout: string;
  urlToRegister?: string;
  urlToApp: string;
  authStore: UseStore<A>;
  fetcher: Fetcher<U | null>;
  shouldPushOnExist?: (router: R) => boolean;
  shouldKickOnNonExist?: (router: R) => boolean;
}

interface UseAuthProps<O extends IOAuthState, R extends BaseRouter> {
  oAuthState: O | null;
  router: R;
}

export function AuthInitializerFactory<
  U extends IUser,
  A extends AuthStoreState<U>,
  R extends BaseRouter
>({
  urlToKickout,
  urlToRegister,
  urlToApp,
  authStore,
  fetcher,
  shouldPushOnExist, // REGEX condition
  shouldKickOnNonExist, // REGEX condition
}: CreateUseAuthInitializerProps<U, A, R>) {
  return function <O extends IOAuthState>({
    oAuthState,
    router,
  }: UseAuthProps<O, R>) {
    const { setUser, user } = authStore();
    const [fetching, _setfetching] = useState(false);
    const fetchingRef = useRef(false);
    const setFetching = (bool: boolean) => {
      fetchingRef.current = bool;
      _setfetching(bool);
    };

    const pushActivatorRef = useRef(false);

    const urlInsideApp = useMemo(
      () => new RegExp(urlToApp).test(router?.asPath),
      [router?.asPath, urlToApp]
    );

    useEffect(() => {
      pushActivatorRef.current = false;
    }, [router?.asPath]);

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      if (typeof window === 'undefined') {
        return;
      }
      if (
        user ||
        !router?.asPath ||
        fetchingRef.current ||
        pushActivatorRef.current
      ) {
        return;
      }
      if (oAuthState) {
        console.info('HANDLING O AUTH');
        handleOAuthUser();
      } else {
        console.info('HANDLING O GENERAL');
        handleGeneralUser();
      }
    }, [oAuthState, user, router?.asPath]);

    const handleInRegisterPath = () => {
      if (!user) {
        return;
      }
      router.push(urlToApp);
    };

    const handleOAuthUser = () => {
      if (
        fetchingRef.current ||
        oAuthState.loading ||
        pushActivatorRef.current
      ) {
        console.info('LOADING OR FETCHIN');
        return;
      }

      if (router.asPath.match(urlToRegister)) {
        console.info('ALREADY IN REGISTER MODE');
        handleInRegisterPath();
        return;
      }

      if (!oAuthState.uid && urlInsideApp) {
        console.info('KICKING OAUTH');
        checkAndKick();
        return;
      }

      if (oAuthState.uid && user) {
        console.info('GOT BOTH USER AND UID');
        return;
      }

      if (oAuthState.uid && !user) {
        checkRegisteredAndPush(oAuthState.uid);
        return;
      }
      console.info('NONE MATCHES...');
    };

    const handleGeneralUser = async () => {
      if (user) {
        return;
      }
      setFetching(true);
      const exist = await fetcher();
      setFetching(false);
      if (exist) {
        pushActivatorRef.current = true;
        shouldPushOnExist(router) && router.push(urlToApp);
        setUser(exist);
      } else {
        checkAndKick();
      }
    };

    const checkRegisteredAndPush = async (uid: string) => {
      console.warn('CHECKING OAUTH REGISTERED USER', uid);
      setFetching(true);
      const registered = await fetcher(uid);
      setFetching(false);
      if (!registered) {
        console.warn('NO REGISTERED USER FOUND');
        console.warn(
          'SHOULD GO TO REGISTER?',
          !new RegExp(urlToRegister).test(router.asPath)
        );
        pushActivatorRef.current = true;
        !new RegExp(urlToRegister).test(router.asPath) &&
          router.push(urlToRegister);
        return;
      }
      console.warn('USER EXSIST!', registered);
      setUser(registered);
      pushActivatorRef.current = true;
      shouldPushOnExist(router) && router.push(urlToApp);
    };

    const checkAndKick = () => {
      console.warn('RESET FETCHING');
      console.warn('URL IN SIDE APP', urlInsideApp);
      console.warn('SHOULD KICK ?', shouldKickOnNonExist(router));
      pushActivatorRef.current = true;
      shouldKickOnNonExist(router) && urlInsideApp && router.push(urlToKickout);
      setFetching(false);
    };

    const loading = useMemo(() => oAuthState?.loading || fetching, [
      oAuthState?.loading,
      fetching,
    ]);

    return [loading];
  };
}
