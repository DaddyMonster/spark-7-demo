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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthError = {
  __typename?: 'AuthError';
  message: Scalars['String'];
  reason: AuthErrorReason;
};

export enum AuthErrorReason {
  BlackListed = 'Black_Listed',
  EmailExist = 'Email_Exist',
  NoUser = 'No_User',
  NotAuth = 'Not_Auth',
  WrongPass = 'Wrong_Pass'
}

export type AuthResponseDao = {
  __typename?: 'AuthResponseDAO';
  error?: Maybe<AuthError>;
  user?: Maybe<LogAppUser>;
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

export enum LogAppRole {
  Admin = 'Admin',
  Lite = 'Lite',
  Power = 'Power'
}

export type LogAppUser = {
  __typename?: 'LogAppUser';
  displayName: Scalars['String'];
  email: Scalars['String'];
  oAuthUid?: Maybe<Scalars['ID']>;
  password: Scalars['String'];
  role: LogAppRole;
  uid: Scalars['ID'];
  username: Scalars['String'];
};

export type LogAppUserSession = {
  __typename?: 'LogAppUserSession';
  email: Scalars['String'];
  expire: Scalars['DateTime'];
  role: Scalars['String'];
  uid: Scalars['Int'];
  username: Scalars['String'];
};

export type LoginDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponseDao;
  logout: Scalars['Boolean'];
  register: AuthResponseDao;
};


export type MutationLoginArgs = {
  login_args: LoginDto;
};


export type MutationRegisterArgs = {
  register_args: RegisterDto;
};

export type Query = {
  __typename?: 'Query';
  checkUser?: Maybe<LogAppUserSession>;
  establish: ConnectionTest;
  me: AuthResponseDao;
};


export type QueryEstablishArgs = {
  input: EstablishConnectionDto;
};

export type RegisterDto = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AuthErrorFragment = (
  { __typename?: 'AuthError' }
  & Pick<AuthError, 'message' | 'reason'>
);

export type LogAppUserFragment = (
  { __typename?: 'LogAppUser' }
  & Pick<LogAppUser, 'displayName' | 'email' | 'oAuthUid' | 'role' | 'uid' | 'username'>
);

export type AuthResponseFragment = (
  { __typename?: 'AuthResponseDAO' }
  & { user?: Maybe<(
    { __typename?: 'LogAppUser' }
    & LogAppUserFragment
  )>, error?: Maybe<(
    { __typename?: 'AuthError' }
    & AuthErrorFragment
  )> }
);

export type AuthSessionFragment = (
  { __typename?: 'LogAppUserSession' }
  & Pick<LogAppUserSession, 'email' | 'role' | 'uid' | 'username' | 'expire'>
);

export type CheckMeQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckMeQuery = (
  { __typename?: 'Query' }
  & { checkUser?: Maybe<(
    { __typename?: 'LogAppUserSession' }
    & AuthSessionFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  loginInput: LoginDto;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponseDAO' }
    & AuthResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'AuthResponseDAO' }
    & AuthResponseFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterDto;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponseDAO' }
    & AuthResponseFragment
  ) }
);

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

export const LogAppUserFragmentDoc = gql`
    fragment LogAppUser on LogAppUser {
  displayName
  email
  oAuthUid
  role
  uid
  username
}
    `;
export const AuthErrorFragmentDoc = gql`
    fragment AuthError on AuthError {
  message
  reason
}
    `;
export const AuthResponseFragmentDoc = gql`
    fragment AuthResponse on AuthResponseDAO {
  user {
    ...LogAppUser
  }
  error {
    ...AuthError
  }
}
    ${LogAppUserFragmentDoc}
${AuthErrorFragmentDoc}`;
export const AuthSessionFragmentDoc = gql`
    fragment AuthSession on LogAppUserSession {
  email
  role
  uid
  username
  expire
}
    `;
export const CheckMeDocument = gql`
    query CheckMe {
  checkUser {
    ...AuthSession
  }
}
    ${AuthSessionFragmentDoc}`;

/**
 * __useCheckMeQuery__
 *
 * To run a query within a React component, call `useCheckMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckMeQuery(baseOptions?: Apollo.QueryHookOptions<CheckMeQuery, CheckMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckMeQuery, CheckMeQueryVariables>(CheckMeDocument, options);
      }
export function useCheckMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckMeQuery, CheckMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckMeQuery, CheckMeQueryVariables>(CheckMeDocument, options);
        }
export type CheckMeQueryHookResult = ReturnType<typeof useCheckMeQuery>;
export type CheckMeLazyQueryHookResult = ReturnType<typeof useCheckMeLazyQuery>;
export type CheckMeQueryResult = Apollo.QueryResult<CheckMeQuery, CheckMeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginDTO!) {
  login(login_args: $loginInput) {
    ...AuthResponse
  }
}
    ${AuthResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...AuthResponse
  }
}
    ${AuthResponseFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterDTO!) {
  register(register_args: $registerInput) {
    ...AuthResponse
  }
}
    ${AuthResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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