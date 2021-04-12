import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase-init';
import { UserDetail } from '../model/user-detail';
import { getUserDetail, shouldRedirect } from './initAuth';
import { UserCollection } from '../model/user-detail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuthStore } from '../store/auth.store';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AddDetailInfo
  extends Pick<UserDetail, 'localLang' | 'learningLang' | 'uid'> {}

interface InitUser {
  loginUser: () => void;
  logout: (cb?: () => void) => void;
  addDetail: (info: AddDetailInfo) => void;
  user: UserDetail | null;
}

export function useAuth(): InitUser {
  const router = useRouter();
  const [_user] = useAuthState(auth);
  const { setUser, user } = useAuthStore((state) => ({
    setUser: state.setUserDetail,
    user: state.userDetail,
  }));

  const loginUser = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);

    if (user) {
      const existing = await getUserDetail(user.uid);
      if (shouldRedirect(existing)) {
        router.push('/auth/more-info');
        return;
      }

      const { email, displayName, photoURL } = existing;
      setUser({ ...existing, email, displayName, photoURL });
    } else {
      throw new Error('User not loged In');
    }
  };

  const logout = async (cb?: () => void) => {
    await firebase.auth().signOut();
    setUser(null);
    cb && cb();
    router.push('/');
  };

  const addDetail = async (infos: AddDetailInfo) => {
    if (!_user) {
      alert('먼저 로그인 해주세요!');
      router.push('/');
    }
    const detailInfos = { ...infos, registered: true };
    await UserCollection.doc(infos.uid).set({ ...detailInfos, chatBag: [] });
    setUser({ ..._user, ...detailInfos, chatBag: [] });
    router.push('/app/seven/home');
  };

  return { loginUser, logout, user, addDetail };
}
