import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ConnectionTest = {
  __typename?: 'ConnectionTest';
  connection: Scalars['Boolean'];
  id: Scalars['Float'];
  log: Scalars['String'];
};

export type EstablishConnectionDto = {
  log: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  establish: ConnectionTest;
};


export type QueryEstablishArgs = {
  input: EstablishConnectionDto;
};

export type ConnectionTestQueryVariables = Exact<{
  log: Scalars['String'];
}>;


export type ConnectionTestQuery = (
  { __typename?: 'Query' }
  & { establish: (
    { __typename: 'ConnectionTest' }
    & Pick<ConnectionTest, 'connection' | 'id' | 'log'>
  ) }
);


export const ConnectionTestDocument = gql`
    query ConnectionTest($log: String!) {
  establish(input: {log: $log}) {
    connection
    id
    log
    __typename
  }
}
    `;

/**
 * __useConnectionTestQuery__
 *
 * To run a query within a React component, call `useConnectionTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useConnectionTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConnectionTestQuery({
 *   variables: {
 *      log: // value for 'log'
 *   },
 * });
 */
export function useConnectionTestQuery(baseOptions: Apollo.QueryHookOptions<ConnectionTestQuery, ConnectionTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConnectionTestQuery, ConnectionTestQueryVariables>(ConnectionTestDocument, options);
      }
export function useConnectionTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConnectionTestQuery, ConnectionTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConnectionTestQuery, ConnectionTestQueryVariables>(ConnectionTestDocument, options);
        }
export type ConnectionTestQueryHookResult = ReturnType<typeof useConnectionTestQuery>;
export type ConnectionTestLazyQueryHookResult = ReturnType<typeof useConnectionTestLazyQuery>;
export type ConnectionTestQueryResult = Apollo.QueryResult<ConnectionTestQuery, ConnectionTestQueryVariables>;