import { useSevenAuthStore } from './useSevenAuthStore';
import firebase from 'firebase/app';
import { auth, FbTimestamp } from '@hessed/client-lib/firebase';
import { SevenUser } from './seven-user.collection';
import { SevenUserInfo, SevenUserRegisterInput } from './model';
import { useEffect } from 'react';

export interface RouterType {
  push: (path: string) => void;
  asPath: string;
}

interface UseAuthActionReturn {
  login: () => void;
  logout: () => void;
  register: (input: SevenUserRegisterInput, rawUser: firebase.User) => void;
  user: SevenUserInfo | null;
}

export const REGISTER_PATH = '/more-info';
export const APP_PATH = '/app/seven/home';
export const LOGOUT_PATH = '/';

export function useSevenAuth<T extends RouterType>(
  router: T
): UseAuthActionReturn {
  const { setUser, user } = useSevenAuthStore();

  const login = async () => {
    console.log('LOGGING IN');
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    if (!user) {
      throw new Error('Auth Failed');
    }
    const exist = await new SevenUser(user.uid).userInfoRef.get();
    if (!exist.data()) {
      console.log('USER NOT EXIST');
      router.push(REGISTER_PATH);
    }
    console.log('USER EXIST PUSHING TO APP');
    console.log(exist.data());
    setUser(exist.data() as SevenUserInfo);
    /* router.push(APP_PATH); */
  };

  useEffect(() => {
    console.log('USER INFO CHANGED!', user);
  }, [user]);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    /* router.push(LOGOUT_PATH); */
  };

  const register = async (
    { interests, learningLang, localLang }: SevenUserRegisterInput,
    { uid, email, displayName, photoURL }: firebase.User
  ) => {
    const newUserInfo: SevenUserInfo = {
      createdAt: FbTimestamp.fromDate(new Date()),
      displayName,
      email,
      followers: [],
      interests,
      learningLang,
      localLang,
      photoURL,
      registered: true,
      uid,
      reputation: 'new',
    };
    await new SevenUser(uid).userInfoRef.set(newUserInfo);
    setUser(newUserInfo);
    /* router.push(APP_PATH); */
  };
  return { login, logout, register, user };
}
