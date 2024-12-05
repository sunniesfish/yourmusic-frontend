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

export type Query = {
  __typename?: 'Query';
  playlist: Playlist;
  playlists: Array<Playlist>;
  statistic: Statistic;
  user: User;
};


export type QueryPlaylistArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStatisticArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
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

export type GetPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlaylistsQuery = { __typename?: 'Query', playlists: Array<{ __typename?: 'Playlist', id: string, name: string, listJson: Array<{ __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null }>, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } }> };

export type GetPlaylistQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', id: string, name: string, listJson: Array<{ __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null }>, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } } };

export type GetStatisticQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetStatisticQuery = { __typename?: 'Query', statistic: { __typename?: 'Statistic', userId: string, albumRankJson: string, artistRankJson: string, genreRankJson: string, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } };

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
export const GetPlaylistsDocument = gql`
    query GetPlaylists {
  playlists {
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
 * __useGetPlaylistsQuery__
 *
 * To run a query within a React component, call `useGetPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
      }
export function useGetPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
        }
export function useGetPlaylistsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
        }
export type GetPlaylistsQueryHookResult = ReturnType<typeof useGetPlaylistsQuery>;
export type GetPlaylistsLazyQueryHookResult = ReturnType<typeof useGetPlaylistsLazyQuery>;
export type GetPlaylistsSuspenseQueryHookResult = ReturnType<typeof useGetPlaylistsSuspenseQuery>;
export type GetPlaylistsQueryResult = Apollo.QueryResult<GetPlaylistsQuery, GetPlaylistsQueryVariables>;
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
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    profileImg
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;