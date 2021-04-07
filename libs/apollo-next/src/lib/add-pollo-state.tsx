import { APOLLO_STATE_PROP_NAME, apolloClient } from './use-apollo';

export function addApolloState(client: typeof apolloClient, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
