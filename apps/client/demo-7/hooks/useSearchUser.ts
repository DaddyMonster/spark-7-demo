import { Nation } from '@hessed/client-module/seven-shared';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { SevenUser, SevenUserInfo } from '@hessed/client-module/seven-auth';
import { omit } from 'lodash';
import { DocSnap, QueryRef } from '../../../../libs/client-lib/firebase/src';
import useTranslation from 'next-translate/useTranslation';

export type SearchUserValues = {
  username: string;
  localLang: Nation | null;
  learningLang: Nation | null;
  interest: ChatTagUnion | null;
  globalError: string;
};

type RealValues = Omit<SearchUserValues, 'globalError'>;

type Query = {
  [key in keyof RealValues]: (
    arg: unknown,
    q: QueryRef<SevenUserInfo>
  ) => QueryRef;
};

const queries: Query = {
  username: (name, q) => q.where('displayName', '==', name),
  interest: (interest, q) => q.where('interests', 'array-contains', interest),
  learningLang: (lang, q) => q.where('learningLang', '==', lang),
  localLang: (lang, q) => q.where('localLang', '==', lang),
};

export const INIT_SEARCH_USER_QUERY: SearchUserValues = {
  username: '',
  localLang: null,
  learningLang: null,
  interest: null,
  globalError: '',
};

export function useSearchUser() {
  const { t } = useTranslation('search-user-form');
  const [searchResult, setsearchResult] = useState<
    DocSnap<SevenUserInfo>[] | null
  >(null);

  const onSubmit = async (
    _values: SearchUserValues,
    { setFieldError }: FormikHelpers<SearchUserValues>
  ) => {
    const valid = Object.values(_values).some((x) => Boolean(x));
    if (!valid) {
      setFieldError('globalError', t('global-err-message'));
      return;
    }
    const values: RealValues = omit(_values, 'globalError');
    const query = Object.keys(values).reduce((acc, cur: keyof RealValues) => {
      if (!values[cur]) {
        return acc;
      }
      return queries[cur](values[cur], acc) as QueryRef<SevenUserInfo>;
    }, SevenUser.collection.where('registered', '==', true));

    const users = await query.orderBy('lastLogged').limit(10).get();
    setsearchResult(users.docs);
  };

  return { onSubmit, searchResult };
}
