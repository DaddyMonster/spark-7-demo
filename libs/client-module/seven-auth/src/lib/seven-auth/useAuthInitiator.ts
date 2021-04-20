import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import { useSevenAuthStore } from './useSevenAuthStore';
import { RouterType, REGISTER_PATH } from './useSevenAuth';
import { SevenUser } from './seven-user.collection';
import { SevenUserInfo } from './model';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useAuthInitiator<T extends RouterType>(
  auth: firebase.auth.Auth,
  router: T
) {
  const [user, loading] = useAuthState(auth);
  const { user: storedUser, setUser } = useSevenAuthStore();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user && !storedUser && !runningRef.current) {
      checkRegisteredAndPush(user.uid);
    }

    if (router && router.asPath.match(/app/) && !user) {
      router.push('/');
    }
  }, [user, loading, router?.asPath, storedUser]);

  const runningRef = useRef(false);

  const checkRegisteredAndPush = async (uid: string) => {
    if (router.asPath.match(/more-info/)) {
      return;
    }
    runningRef.current = true;
    const exist = await new SevenUser(uid).userInfoRef.get();
    const userInfo = exist?.data();
    if (userInfo) {
      setUser(userInfo as SevenUserInfo);
    } else {
      router.push(REGISTER_PATH);
    }
    runningRef.current = false;
  };
  return [loading];
}
