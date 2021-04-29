import { DocSnap } from '@hessed/client-lib/firebase';
import { CacheStoreFactory } from '@hessed/hook/store';
import { SevenUserInfo } from './model';
import { SevenUser } from './seven-user.collection';

export const UserQueryType = ['recommaded', 'top-rated'] as const;
export type UserQuery = typeof UserQueryType[number];

const userQueryFetcher = (key: UserQuery, args: unknown, limit: number) => {
  switch (key) {
    case 'recommaded':
      return async () =>
        await SevenUser.collection
          .where('interests', 'array-contains-any', args)
          .orderBy('lastLogged')
          .limitToLast(limit)
          .get()
          .then((x) => x.docs);
    case 'top-rated':
      return async () =>
        await SevenUser.collection
          .orderBy('followerCount')
          .limit(limit)
          .get()
          .then((x) => {
            console.log(x.docs.map((x) => x.data()));
            return x.docs;
          });
    default:
      throw new Error('NOT SUPPORTED KEy');
  }
};

export const useUserCacheStore = CacheStoreFactory<
  DocSnap<SevenUserInfo>[],
  UserQuery
>({
  keyList: UserQueryType,
  initFetch: async (key, args, limit) => {
    return await userQueryFetcher(key, args, limit)();
  },
});
