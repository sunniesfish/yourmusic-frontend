import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type ChangePasswordInput = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  checkPassword: Scalars['Boolean']['output'];
  convertToSpotifyPlaylist: Scalars['Boolean']['output'];
  convertToYoutubePlaylist: Scalars['Boolean']['output'];
  readPlaylist: Array<PlaylistJson>;
  removePlaylist: Playlist;
  removeStatistic: Statistic;
  savePlaylist: Scalars['Boolean']['output'];
  saveStatistic: Scalars['Boolean']['output'];
  signIn: SignInResponse;
  signOut: Scalars['Boolean']['output'];
  signUp: Scalars['Boolean']['output'];
  updateStatistic: Statistic;
  updateUser: Scalars['Boolean']['output'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCheckPasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationConvertToSpotifyPlaylistArgs = {
  listJSON: Array<PlaylistJsonInput>;
};


export type MutationConvertToYoutubePlaylistArgs = {
  listJSON: Array<PlaylistJsonInput>;
};


export type MutationReadPlaylistArgs = {
  link: Scalars['String']['input'];
};


export type MutationRemovePlaylistArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveStatisticArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationSavePlaylistArgs = {
  savePlaylistInput: SavePlaylistInput;
};


export type MutationSaveStatisticArgs = {
  saveStatisticInput: SaveStatisticInput;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpdateStatisticArgs = {
  updateStatisticInput: UpdateStatisticInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Playlist = {
  __typename?: 'Playlist';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  listJson: Array<PlaylistJson>;
  name: Scalars['String']['output'];
  user: User;
};

export type PlaylistJson = {
  __typename?: 'PlaylistJSON';
  album?: Maybe<Scalars['String']['output']>;
  artist?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PlaylistJsonInput = {
  album?: InputMaybe<Scalars['String']['input']>;
  artist?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PlaylistsResponse = {
  __typename?: 'PlaylistsResponse';
  playlists: Array<Playlist>;
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  playlist: Playlist;
  playlists: PlaylistsResponse;
  statistic: Statistic;
  user: User;
};


export type QueryPlaylistArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPlaylistsArgs = {
  limit: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
  page: Scalars['Int']['input'];
};


export type QueryStatisticArgs = {
  userId: Scalars['ID']['input'];
};

export type SavePlaylistInput = {
  listJson: Array<PlaylistJsonInput>;
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type SaveStatisticInput = {
  albumRankJson: Scalars['String']['input'];
  artistRankJson: Scalars['String']['input'];
  genreRankJson: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type SignInInput = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type SignUpInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profileImg?: InputMaybe<Scalars['String']['input']>;
};

export type Statistic = {
  __typename?: 'Statistic';
  albumRankJson: Scalars['String']['output'];
  artistRankJson: Scalars['String']['output'];
  genreRankJson: Scalars['String']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type UpdateStatisticInput = {
  albumRankJson?: InputMaybe<Scalars['String']['input']>;
  artistRankJson?: InputMaybe<Scalars['String']['input']>;
  genreRankJson?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type UpdateUserInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  profileImg?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  profileImg?: Maybe<Scalars['String']['output']>;
};

export type UserFieldsFragment = { __typename?: 'User', id: string, name: string, profileImg?: string | null };

export type PlaylistJsonFieldsFragment = { __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null };

export type PlaylistFieldsFragment = { __typename?: 'Playlist', id: string, name: string, listJson: Array<{ __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null }>, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } };

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInResponse', accessToken: string, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } } };

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: boolean };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: boolean };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', id: string, name: string, profileImg?: string | null } };

export type CheckPasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type CheckPasswordMutation = { __typename?: 'Mutation', checkPassword: boolean };

export type GetPlaylistsPaginatedQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
}>;


export type GetPlaylistsPaginatedQuery = { __typename?: 'Query', playlists: { __typename?: 'PlaylistsResponse', totalPages: number, playlists: Array<{ __typename?: 'Playlist', id: string, name: string, listJson: Array<{ __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null }> }> } };

export type GetPlaylistQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', id: string, name: string, listJson: Array<{ __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null }>, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } } };

export type GetStatisticQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetStatisticQuery = { __typename?: 'Query', statistic: { __typename?: 'Statistic', userId: string, albumRankJson: string, artistRankJson: string, genreRankJson: string, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } } };

export const PlaylistJsonFieldsFragmentDoc = gql`
    fragment PlaylistJsonFields on PlaylistJSON {
  title
  artist
  album
  thumbnail
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  name
  profileImg
}
    `;
export const PlaylistFieldsFragmentDoc = gql`
    fragment PlaylistFields on Playlist {
  id
  name
  listJson {
    ...PlaylistJsonFields
  }
  user {
    ...UserFields
  }
}
    `;
export const SignInDocument = gql`
    mutation SignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    user {
      id
      name
      profileImg
    }
    accessToken
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      signInInput: // value for 'signInInput'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($signUpInput: SignUpInput!) {
  signUp(signUpInput: $signUpInput)
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signUpInput: // value for 'signUpInput'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    id
    name
    profileImg
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CheckPasswordDocument = gql`
    mutation CheckPassword($input: ChangePasswordInput!) {
  checkPassword(input: $input)
}
    `;
export type CheckPasswordMutationFn = Apollo.MutationFunction<CheckPasswordMutation, CheckPasswordMutationVariables>;

/**
 * __useCheckPasswordMutation__
 *
 * To run a mutation, you first call `useCheckPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkPasswordMutation, { data, loading, error }] = useCheckPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckPasswordMutation(baseOptions?: Apollo.MutationHookOptions<CheckPasswordMutation, CheckPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckPasswordMutation, CheckPasswordMutationVariables>(CheckPasswordDocument, options);
      }
export type CheckPasswordMutationHookResult = ReturnType<typeof useCheckPasswordMutation>;
export type CheckPasswordMutationResult = Apollo.MutationResult<CheckPasswordMutation>;
export type CheckPasswordMutationOptions = Apollo.BaseMutationOptions<CheckPasswordMutation, CheckPasswordMutationVariables>;
export const GetPlaylistsPaginatedDocument = gql`
    query GetPlaylistsPaginated($page: Int!, $limit: Int!, $orderBy: String!) {
  playlists(page: $page, limit: $limit, orderBy: $orderBy) {
    playlists {
      id
      name
      listJson {
        title
        artist
        album
        thumbnail
      }
    }
    totalPages
  }
}
    `;

/**
 * __useGetPlaylistsPaginatedQuery__
 *
 * To run a query within a React component, call `useGetPlaylistsPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistsPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistsPaginatedQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetPlaylistsPaginatedQuery(baseOptions: Apollo.QueryHookOptions<GetPlaylistsPaginatedQuery, GetPlaylistsPaginatedQueryVariables> & ({ variables: GetPlaylistsPaginatedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistsPaginatedQuery, GetPlaylistsPaginatedQueryVariables>(GetPlaylistsPaginatedDocument, options);
      }
export function useGetPlaylistsPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistsPaginatedQuery, GetPlaylistsPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistsPaginatedQuery, GetPlaylistsPaginatedQueryVariables>(GetPlaylistsPaginatedDocument, options);
        }
export function useGetPlaylistsPaginatedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlaylistsPaginatedQuery, GetPlaylistsPaginatedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlaylistsPaginatedQuery, GetPlaylistsPaginatedQueryVariables>(GetPlaylistsPaginatedDocument, options);
        }
export type GetPlaylistsPaginatedQueryHookResult = ReturnType<typeof useGetPlaylistsPaginatedQuery>;
export type GetPlaylistsPaginatedLazyQueryHookResult = ReturnType<typeof useGetPlaylistsPaginatedLazyQuery>;
export type GetPlaylistsPaginatedSuspenseQueryHookResult = ReturnType<typeof useGetPlaylistsPaginatedSuspenseQuery>;
export type GetPlaylistsPaginatedQueryResult = Apollo.QueryResult<GetPlaylistsPaginatedQuery, GetPlaylistsPaginatedQueryVariables>;
export const GetPlaylistDocument = gql`
    query GetPlaylist($id: Int!) {
  playlist(id: $id) {
    id
    name
    listJson {
      title
      artist
      album
      thumbnail
    }
    user {
      id
      name
      profileImg
    }
  }
}
    `;

/**
 * __useGetPlaylistQuery__
 *
 * To run a query within a React component, call `useGetPlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlaylistQuery(baseOptions: Apollo.QueryHookOptions<GetPlaylistQuery, GetPlaylistQueryVariables> & ({ variables: GetPlaylistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistQuery, GetPlaylistQueryVariables>(GetPlaylistDocument, options);
      }
export function useGetPlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistQuery, GetPlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistQuery, GetPlaylistQueryVariables>(GetPlaylistDocument, options);
        }
export function useGetPlaylistSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlaylistQuery, GetPlaylistQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlaylistQuery, GetPlaylistQueryVariables>(GetPlaylistDocument, options);
        }
export type GetPlaylistQueryHookResult = ReturnType<typeof useGetPlaylistQuery>;
export type GetPlaylistLazyQueryHookResult = ReturnType<typeof useGetPlaylistLazyQuery>;
export type GetPlaylistSuspenseQueryHookResult = ReturnType<typeof useGetPlaylistSuspenseQuery>;
export type GetPlaylistQueryResult = Apollo.QueryResult<GetPlaylistQuery, GetPlaylistQueryVariables>;
export const GetStatisticDocument = gql`
    query GetStatistic($userId: ID!) {
  statistic(userId: $userId) {
    userId
    albumRankJson
    artistRankJson
    genreRankJson
    user {
      id
      name
      profileImg
    }
  }
}
    `;

/**
 * __useGetStatisticQuery__
 *
 * To run a query within a React component, call `useGetStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatisticQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetStatisticQuery(baseOptions: Apollo.QueryHookOptions<GetStatisticQuery, GetStatisticQueryVariables> & ({ variables: GetStatisticQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatisticQuery, GetStatisticQueryVariables>(GetStatisticDocument, options);
      }
export function useGetStatisticLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatisticQuery, GetStatisticQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatisticQuery, GetStatisticQueryVariables>(GetStatisticDocument, options);
        }
export function useGetStatisticSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatisticQuery, GetStatisticQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStatisticQuery, GetStatisticQueryVariables>(GetStatisticDocument, options);
        }
export type GetStatisticQueryHookResult = ReturnType<typeof useGetStatisticQuery>;
export type GetStatisticLazyQueryHookResult = ReturnType<typeof useGetStatisticLazyQuery>;
export type GetStatisticSuspenseQueryHookResult = ReturnType<typeof useGetStatisticSuspenseQuery>;
export type GetStatisticQueryResult = Apollo.QueryResult<GetStatisticQuery, GetStatisticQueryVariables>;