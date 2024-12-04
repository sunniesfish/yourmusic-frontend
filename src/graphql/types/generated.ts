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
  savePlaylist: Playlist;
  saveStatistic: Statistic;
  signIn: User;
  signUp: User;
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
  listJson: Scalars['String']['input'];
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

export type SavePlaylistMutationVariables = Exact<{
  savePlaylistInput: SavePlaylistInput;
}>;


export type SavePlaylistMutation = { __typename?: 'Mutation', savePlaylist: { __typename?: 'Playlist', id: string, name: string, listJson: Array<{ __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null }>, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } } };

export type RemovePlaylistMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemovePlaylistMutation = { __typename?: 'Mutation', removePlaylist: { __typename?: 'Playlist', id: string, name: string, listJson: Array<{ __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null }> } };

export type ReadPlaylistMutationVariables = Exact<{
  link: Scalars['String']['input'];
}>;


export type ReadPlaylistMutation = { __typename?: 'Mutation', readPlaylist: Array<{ __typename?: 'PlaylistJSON', title?: string | null, artist?: string | null, album?: string | null, thumbnail?: string | null }> };

export type ConvertToSpotifyPlaylistMutationVariables = Exact<{
  listJSON: Array<PlaylistJsonInput> | PlaylistJsonInput;
}>;


export type ConvertToSpotifyPlaylistMutation = { __typename?: 'Mutation', convertToSpotifyPlaylist: boolean };

export type ConvertToYoutubePlaylistMutationVariables = Exact<{
  listJSON: Array<PlaylistJsonInput> | PlaylistJsonInput;
}>;


export type ConvertToYoutubePlaylistMutation = { __typename?: 'Mutation', convertToYoutubePlaylist: boolean };

export type SaveStatisticMutationVariables = Exact<{
  saveStatisticInput: SaveStatisticInput;
}>;


export type SaveStatisticMutation = { __typename?: 'Mutation', saveStatistic: { __typename?: 'Statistic', userId: string, albumRankJson: string, artistRankJson: string, genreRankJson: string, user: { __typename?: 'User', id: string, name: string, profileImg?: string | null } } };

export type UpdateStatisticMutationVariables = Exact<{
  updateStatisticInput: UpdateStatisticInput;
}>;


export type UpdateStatisticMutation = { __typename?: 'Mutation', updateStatistic: { __typename?: 'Statistic', userId: string, albumRankJson: string, artistRankJson: string, genreRankJson: string } };

export type RemoveStatisticMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type RemoveStatisticMutation = { __typename?: 'Mutation', removeStatistic: { __typename?: 'Statistic', userId: string, albumRankJson: string, artistRankJson: string, genreRankJson: string } };

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', id: string, name: string, profileImg?: string | null } };

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, name: string, profileImg?: string | null } };

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


export const SavePlaylistDocument = gql`
    mutation SavePlaylist($savePlaylistInput: SavePlaylistInput!) {
  savePlaylist(savePlaylistInput: $savePlaylistInput) {
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
export type SavePlaylistMutationFn = Apollo.MutationFunction<SavePlaylistMutation, SavePlaylistMutationVariables>;

/**
 * __useSavePlaylistMutation__
 *
 * To run a mutation, you first call `useSavePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePlaylistMutation, { data, loading, error }] = useSavePlaylistMutation({
 *   variables: {
 *      savePlaylistInput: // value for 'savePlaylistInput'
 *   },
 * });
 */
export function useSavePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<SavePlaylistMutation, SavePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SavePlaylistMutation, SavePlaylistMutationVariables>(SavePlaylistDocument, options);
      }
export type SavePlaylistMutationHookResult = ReturnType<typeof useSavePlaylistMutation>;
export type SavePlaylistMutationResult = Apollo.MutationResult<SavePlaylistMutation>;
export type SavePlaylistMutationOptions = Apollo.BaseMutationOptions<SavePlaylistMutation, SavePlaylistMutationVariables>;
export const RemovePlaylistDocument = gql`
    mutation RemovePlaylist($id: Int!) {
  removePlaylist(id: $id) {
    id
    name
    listJson {
      title
      artist
      album
      thumbnail
    }
  }
}
    `;
export type RemovePlaylistMutationFn = Apollo.MutationFunction<RemovePlaylistMutation, RemovePlaylistMutationVariables>;

/**
 * __useRemovePlaylistMutation__
 *
 * To run a mutation, you first call `useRemovePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePlaylistMutation, { data, loading, error }] = useRemovePlaylistMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<RemovePlaylistMutation, RemovePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePlaylistMutation, RemovePlaylistMutationVariables>(RemovePlaylistDocument, options);
      }
export type RemovePlaylistMutationHookResult = ReturnType<typeof useRemovePlaylistMutation>;
export type RemovePlaylistMutationResult = Apollo.MutationResult<RemovePlaylistMutation>;
export type RemovePlaylistMutationOptions = Apollo.BaseMutationOptions<RemovePlaylistMutation, RemovePlaylistMutationVariables>;
export const ReadPlaylistDocument = gql`
    mutation ReadPlaylist($link: String!) {
  readPlaylist(link: $link) {
    title
    artist
    album
    thumbnail
  }
}
    `;
export type ReadPlaylistMutationFn = Apollo.MutationFunction<ReadPlaylistMutation, ReadPlaylistMutationVariables>;

/**
 * __useReadPlaylistMutation__
 *
 * To run a mutation, you first call `useReadPlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadPlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readPlaylistMutation, { data, loading, error }] = useReadPlaylistMutation({
 *   variables: {
 *      link: // value for 'link'
 *   },
 * });
 */
export function useReadPlaylistMutation(baseOptions?: Apollo.MutationHookOptions<ReadPlaylistMutation, ReadPlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadPlaylistMutation, ReadPlaylistMutationVariables>(ReadPlaylistDocument, options);
      }
export type ReadPlaylistMutationHookResult = ReturnType<typeof useReadPlaylistMutation>;
export type ReadPlaylistMutationResult = Apollo.MutationResult<ReadPlaylistMutation>;
export type ReadPlaylistMutationOptions = Apollo.BaseMutationOptions<ReadPlaylistMutation, ReadPlaylistMutationVariables>;
export const ConvertToSpotifyPlaylistDocument = gql`
    mutation ConvertToSpotifyPlaylist($listJSON: [PlaylistJSONInput!]!) {
  convertToSpotifyPlaylist(listJSON: $listJSON)
}
    `;
export type ConvertToSpotifyPlaylistMutationFn = Apollo.MutationFunction<ConvertToSpotifyPlaylistMutation, ConvertToSpotifyPlaylistMutationVariables>;

/**
 * __useConvertToSpotifyPlaylistMutation__
 *
 * To run a mutation, you first call `useConvertToSpotifyPlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertToSpotifyPlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertToSpotifyPlaylistMutation, { data, loading, error }] = useConvertToSpotifyPlaylistMutation({
 *   variables: {
 *      listJSON: // value for 'listJSON'
 *   },
 * });
 */
export function useConvertToSpotifyPlaylistMutation(baseOptions?: Apollo.MutationHookOptions<ConvertToSpotifyPlaylistMutation, ConvertToSpotifyPlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConvertToSpotifyPlaylistMutation, ConvertToSpotifyPlaylistMutationVariables>(ConvertToSpotifyPlaylistDocument, options);
      }
export type ConvertToSpotifyPlaylistMutationHookResult = ReturnType<typeof useConvertToSpotifyPlaylistMutation>;
export type ConvertToSpotifyPlaylistMutationResult = Apollo.MutationResult<ConvertToSpotifyPlaylistMutation>;
export type ConvertToSpotifyPlaylistMutationOptions = Apollo.BaseMutationOptions<ConvertToSpotifyPlaylistMutation, ConvertToSpotifyPlaylistMutationVariables>;
export const ConvertToYoutubePlaylistDocument = gql`
    mutation ConvertToYoutubePlaylist($listJSON: [PlaylistJSONInput!]!) {
  convertToYoutubePlaylist(listJSON: $listJSON)
}
    `;
export type ConvertToYoutubePlaylistMutationFn = Apollo.MutationFunction<ConvertToYoutubePlaylistMutation, ConvertToYoutubePlaylistMutationVariables>;

/**
 * __useConvertToYoutubePlaylistMutation__
 *
 * To run a mutation, you first call `useConvertToYoutubePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertToYoutubePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertToYoutubePlaylistMutation, { data, loading, error }] = useConvertToYoutubePlaylistMutation({
 *   variables: {
 *      listJSON: // value for 'listJSON'
 *   },
 * });
 */
export function useConvertToYoutubePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<ConvertToYoutubePlaylistMutation, ConvertToYoutubePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConvertToYoutubePlaylistMutation, ConvertToYoutubePlaylistMutationVariables>(ConvertToYoutubePlaylistDocument, options);
      }
export type ConvertToYoutubePlaylistMutationHookResult = ReturnType<typeof useConvertToYoutubePlaylistMutation>;
export type ConvertToYoutubePlaylistMutationResult = Apollo.MutationResult<ConvertToYoutubePlaylistMutation>;
export type ConvertToYoutubePlaylistMutationOptions = Apollo.BaseMutationOptions<ConvertToYoutubePlaylistMutation, ConvertToYoutubePlaylistMutationVariables>;
export const SaveStatisticDocument = gql`
    mutation SaveStatistic($saveStatisticInput: SaveStatisticInput!) {
  saveStatistic(saveStatisticInput: $saveStatisticInput) {
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
export type SaveStatisticMutationFn = Apollo.MutationFunction<SaveStatisticMutation, SaveStatisticMutationVariables>;

/**
 * __useSaveStatisticMutation__
 *
 * To run a mutation, you first call `useSaveStatisticMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveStatisticMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveStatisticMutation, { data, loading, error }] = useSaveStatisticMutation({
 *   variables: {
 *      saveStatisticInput: // value for 'saveStatisticInput'
 *   },
 * });
 */
export function useSaveStatisticMutation(baseOptions?: Apollo.MutationHookOptions<SaveStatisticMutation, SaveStatisticMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveStatisticMutation, SaveStatisticMutationVariables>(SaveStatisticDocument, options);
      }
export type SaveStatisticMutationHookResult = ReturnType<typeof useSaveStatisticMutation>;
export type SaveStatisticMutationResult = Apollo.MutationResult<SaveStatisticMutation>;
export type SaveStatisticMutationOptions = Apollo.BaseMutationOptions<SaveStatisticMutation, SaveStatisticMutationVariables>;
export const UpdateStatisticDocument = gql`
    mutation UpdateStatistic($updateStatisticInput: UpdateStatisticInput!) {
  updateStatistic(updateStatisticInput: $updateStatisticInput) {
    userId
    albumRankJson
    artistRankJson
    genreRankJson
  }
}
    `;
export type UpdateStatisticMutationFn = Apollo.MutationFunction<UpdateStatisticMutation, UpdateStatisticMutationVariables>;

/**
 * __useUpdateStatisticMutation__
 *
 * To run a mutation, you first call `useUpdateStatisticMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatisticMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatisticMutation, { data, loading, error }] = useUpdateStatisticMutation({
 *   variables: {
 *      updateStatisticInput: // value for 'updateStatisticInput'
 *   },
 * });
 */
export function useUpdateStatisticMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStatisticMutation, UpdateStatisticMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStatisticMutation, UpdateStatisticMutationVariables>(UpdateStatisticDocument, options);
      }
export type UpdateStatisticMutationHookResult = ReturnType<typeof useUpdateStatisticMutation>;
export type UpdateStatisticMutationResult = Apollo.MutationResult<UpdateStatisticMutation>;
export type UpdateStatisticMutationOptions = Apollo.BaseMutationOptions<UpdateStatisticMutation, UpdateStatisticMutationVariables>;
export const RemoveStatisticDocument = gql`
    mutation RemoveStatistic($userId: ID!) {
  removeStatistic(userId: $userId) {
    userId
    albumRankJson
    artistRankJson
    genreRankJson
  }
}
    `;
export type RemoveStatisticMutationFn = Apollo.MutationFunction<RemoveStatisticMutation, RemoveStatisticMutationVariables>;

/**
 * __useRemoveStatisticMutation__
 *
 * To run a mutation, you first call `useRemoveStatisticMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStatisticMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStatisticMutation, { data, loading, error }] = useRemoveStatisticMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveStatisticMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStatisticMutation, RemoveStatisticMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStatisticMutation, RemoveStatisticMutationVariables>(RemoveStatisticDocument, options);
      }
export type RemoveStatisticMutationHookResult = ReturnType<typeof useRemoveStatisticMutation>;
export type RemoveStatisticMutationResult = Apollo.MutationResult<RemoveStatisticMutation>;
export type RemoveStatisticMutationOptions = Apollo.BaseMutationOptions<RemoveStatisticMutation, RemoveStatisticMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    id
    name
    profileImg
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
  signUp(signUpInput: $signUpInput) {
    id
    name
    profileImg
  }
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