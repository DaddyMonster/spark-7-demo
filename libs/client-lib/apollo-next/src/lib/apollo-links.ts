import { ApolloLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { WebSocketLink } from '@apollo/client/link/ws';
import * as ws from 'isomorphic-ws';
import {
  getMainDefinition,
  getQueryDefinition,
} from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import apolloLogger from 'apollo-link-logger';
const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: 'include',
});

const getWsUri = () =>
  (window?.location?.protocol === 'https' ? 'wss://' : 'ws://') +
  window?.location?.host +
  process.env.NEXT_PUBLIC_GRAPHQL_WS_URI;

const wsLink = (uri: string) =>
  new WebSocketLink({
    uri,
    webSocketImpl: ws,
  });

const loggerLink = new ApolloLink((ops, forward) => {
  const { query, variables, operationName } = ops;
  const { operation } = getQueryDefinition(query);
  const { kind } = getMainDefinition(query);
  const operationSummary = {
    operation,
    kind,
    variables,
  };
  console.log(
    `Operation ${operationName} Open : ${JSON.stringify(operationSummary)}`
  );
  return forward(ops);
});

const directionalLink = (process as any).browser
  ? new RetryLink().split(
      ({ query }) => {
        const { operation } = getQueryDefinition(query);
        const { kind } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink(getWsUri()),
      uploadLink
    )
  : uploadLink;

export const link = ApolloLink.from([
  loggerLink,
  apolloLogger,
  directionalLink,
]);
