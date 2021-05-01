import { AuthInitializerFactory } from '@hessed/hook/create-auth';
import { SevenUserInfo } from './model';
import { SevenUser } from './seven-user.collection';
import { REGISTER_PATH } from './useSevenAuth';
import { useSevenAuthStore } from './useSevenAuthStore';

export const useAuthInitiator = AuthInitializerFactory({
  authStore: useSevenAuthStore,
  fetcher: async (uid?: string) => {
    console.log('FETCHING');
    const result = await new SevenUser(uid).userInfoRef.get();
    if (!result?.exists) {
      console.log('NO USER');
      return null;
    }
    console.log(result.data());
    return result.data() as SevenUserInfo;
  },
  urlToApp: '/app/seven/home',
  urlToKickout: '/',
  urlToRegister: REGISTER_PATH,
  shouldKickOnNonExist: ({ asPath }) => /app/.test(asPath),
  shouldPushOnExist: ({ asPath }) => /more-info/.test(asPath),
});
