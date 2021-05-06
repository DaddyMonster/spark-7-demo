/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
import {
  LogAppRole,
  useCheckMeQuery,
  CheckMeDocument,
  LogAppUserSession,
} from '@hessed/gql/log-app';
import { LogAppPageType } from '../types';
import { useRouter } from 'next/router';
import {
  addApolloState,
  initializeApollo,
} from '@hessed/client-lib/apollo-next';
import { SimpleLoading } from '../../../../libs/ui/web/atom/src';

const WithAuthRoute = (
  Component: LogAppPageType,
  allowedRoles?: LogAppRole[],
  validate?: (user: LogAppUserSession) => boolean
) => {
  return (props: unknown) => {
    const router = useRouter();

    Component.getInitialProps = useCallback(async (ctx) => {
      const apolloClient = initializeApollo();
      await apolloClient.query({
        query: CheckMeDocument,
        fetchPolicy: 'network-only',
      });
      return addApolloState(apolloClient, {
        props: {},
      });
    }, []);

    const { data, loading, error } = useCheckMeQuery();

    if (error) {
      router.replace('/404');
    }

    if (loading) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <SimpleLoading />
        </div>
      );
    }

    if (!data.checkUser) {
      router.replace('/login');
    }

    const valid = !validate
      ? !allowedRoles ||
        allowedRoles.includes(data.checkUser.role as LogAppRole)
      : validate(data.checkUser);

    if (valid) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Component {...(props as any)} />;
    }
    router.push('/no-auth');
    return null;
  };
};

export default WithAuthRoute;
