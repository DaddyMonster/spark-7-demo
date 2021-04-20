import { useEffect } from 'react';
import firebase from 'firebase/app';
import { useSevenAuthStore } from './useSevenAuthStore';
import { RouterType, REGISTER_PATH } from './useSevenAuth';
import { SevenUser } from './seven-user.collection';
import { SevenUserInfo } from './model';

export function useAuthInitiator<T extends RouterType>(
  auth: firebase.auth.Auth,
  router: T
) {
  const userStore = useSevenAuthStore();

  useEffect(() => {
    if (auth.currentUser && userStore.user) {
      return;
    }

    if (auth.currentUser && !userStore.user) {
      console.log('NONE REGISTERED USER');
      checkRegisteredAndPush(auth.currentUser.uid);
    }

    if (!auth.currentUser && router?.asPath && router.asPath !== '/') {
      alert('먼저 로그인 해주세요!');
      router.push('/');
    }
  }, [auth, router?.asPath, userStore?.user]);

  const checkRegisteredAndPush = async (uid: string) => {
    console.log('USER DETECTED!');
    const exist = await new SevenUser(uid).userInfoRef.get();
    const userInfo = exist?.data();
    if (userInfo) {
      userStore.setUser(userInfo as SevenUserInfo);
    } else {
      router.push(REGISTER_PATH);
    }
  };
  return [];
}
