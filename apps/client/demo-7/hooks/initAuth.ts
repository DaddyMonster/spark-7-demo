import { UserCollection, UserDetail } from '../model/user-detail';
import { useAuthStore } from './authStore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase-init';
import { useEffect, useRef } from 'react';
import { NextRouter } from 'next/router';

export const getUserDetail = async (uid: string) => {
  const user = await UserCollection.doc(uid).get();
  return user.data() as UserDetail | undefined;
};
export const shouldRedirect = (userDetail: UserDetail | null): boolean => {
  if (!userDetail || !userDetail.registered) {
    return true;
  }
  return false;
};

interface InitAuthProps {
  router: NextRouter;
}

export function useInitAuth({ router }: InitAuthProps): [UserDetail] {
  const [_user, loading] = useAuthState(auth);

  const { user, setUser } = useAuthStore((state) => ({
    user: state.userDetail,
    setUser: state.setUserDetail,
  }));

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
      }
    });
  }, []);

  const initRef = useRef(true);
  useEffect(() => {
    if (loading || !initRef.current) {
      return;
    }

    if (_user) {
      handleUser(_user.uid);
      initRef.current = false;
    }
  }, [loading]);

  const handleUser = async (uid: string) => {
    const userDetail = await getUserDetail(uid);
    if (shouldRedirect(userDetail)) {
      router.push('/auth/more-info');
    } else {
      const { email, displayName } = _user;
      setUser({ ...userDetail, email, displayName });
    }
  };

  return [user];
}
