import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { useMemo } from 'react';
import { link } from './apollo-links';
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
export let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(ctx?: NextPageContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache);
    _apolloClient.cache.restore(data);
  }
  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(pageProps: AppProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
