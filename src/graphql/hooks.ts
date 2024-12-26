import * as Types from "./operations";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;

export const SignUpDocument = gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  Types.SignUpMutation,
  Types.SignUpMutationVariables
>;

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
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SignUpMutation,
    Types.SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SignUpMutation,
    Types.SignUpMutationVariables
  >(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<Types.SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  Types.SignUpMutation,
  Types.SignUpMutationVariables
>;
export const SignInDocument = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      accessToken
      user {
        id
        name
        profileImg
      }
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  Types.SignInMutation,
  Types.SignInMutationVariables
>;

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
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SignInMutation,
    Types.SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SignInMutation,
    Types.SignInMutationVariables
  >(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<Types.SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  Types.SignInMutation,
  Types.SignInMutationVariables
>;
export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  Types.SignOutMutation,
  Types.SignOutMutationVariables
>;

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
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SignOutMutation,
    Types.SignOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SignOutMutation,
    Types.SignOutMutationVariables
  >(SignOutDocument, options);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult =
  Apollo.MutationResult<Types.SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  Types.SignOutMutation,
  Types.SignOutMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id
      name
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  Types.ChangePasswordMutation,
  Types.ChangePasswordMutationVariables
>;

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
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ChangePasswordMutation,
    Types.ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ChangePasswordMutation,
    Types.ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<Types.ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.ChangePasswordMutation,
  Types.ChangePasswordMutationVariables
>;
export const SavePlaylistDocument = gql`
  mutation SavePlaylist($savePlaylistInput: SavePlaylistInput!) {
    savePlaylist(savePlaylistInput: $savePlaylistInput)
  }
`;
export type SavePlaylistMutationFn = Apollo.MutationFunction<
  Types.SavePlaylistMutation,
  Types.SavePlaylistMutationVariables
>;

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
export function useSavePlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SavePlaylistMutation,
    Types.SavePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SavePlaylistMutation,
    Types.SavePlaylistMutationVariables
  >(SavePlaylistDocument, options);
}
export type SavePlaylistMutationHookResult = ReturnType<
  typeof useSavePlaylistMutation
>;
export type SavePlaylistMutationResult =
  Apollo.MutationResult<Types.SavePlaylistMutation>;
export type SavePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Types.SavePlaylistMutation,
  Types.SavePlaylistMutationVariables
>;
export const RemovePlaylistDocument = gql`
  mutation RemovePlaylist($id: Int!) {
    removePlaylist(id: $id) {
      id
      name
    }
  }
`;
export type RemovePlaylistMutationFn = Apollo.MutationFunction<
  Types.RemovePlaylistMutation,
  Types.RemovePlaylistMutationVariables
>;

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
export function useRemovePlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RemovePlaylistMutation,
    Types.RemovePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RemovePlaylistMutation,
    Types.RemovePlaylistMutationVariables
  >(RemovePlaylistDocument, options);
}
export type RemovePlaylistMutationHookResult = ReturnType<
  typeof useRemovePlaylistMutation
>;
export type RemovePlaylistMutationResult =
  Apollo.MutationResult<Types.RemovePlaylistMutation>;
export type RemovePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Types.RemovePlaylistMutation,
  Types.RemovePlaylistMutationVariables
>;
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
export type ReadPlaylistMutationFn = Apollo.MutationFunction<
  Types.ReadPlaylistMutation,
  Types.ReadPlaylistMutationVariables
>;

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
export function useReadPlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ReadPlaylistMutation,
    Types.ReadPlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ReadPlaylistMutation,
    Types.ReadPlaylistMutationVariables
  >(ReadPlaylistDocument, options);
}
export type ReadPlaylistMutationHookResult = ReturnType<
  typeof useReadPlaylistMutation
>;
export type ReadPlaylistMutationResult =
  Apollo.MutationResult<Types.ReadPlaylistMutation>;
export type ReadPlaylistMutationOptions = Apollo.BaseMutationOptions<
  Types.ReadPlaylistMutation,
  Types.ReadPlaylistMutationVariables
>;
export const ConvertToSpotifyPlaylistDocument = gql`
  mutation ConvertToSpotifyPlaylist($listJSON: [PlaylistJSONInput!]!) {
    convertToSpotifyPlaylist(listJSON: $listJSON)
  }
`;
export type ConvertToSpotifyPlaylistMutationFn = Apollo.MutationFunction<
  Types.ConvertToSpotifyPlaylistMutation,
  Types.ConvertToSpotifyPlaylistMutationVariables
>;

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
export function useConvertToSpotifyPlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ConvertToSpotifyPlaylistMutation,
    Types.ConvertToSpotifyPlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ConvertToSpotifyPlaylistMutation,
    Types.ConvertToSpotifyPlaylistMutationVariables
  >(ConvertToSpotifyPlaylistDocument, options);
}
export type ConvertToSpotifyPlaylistMutationHookResult = ReturnType<
  typeof useConvertToSpotifyPlaylistMutation
>;
export type ConvertToSpotifyPlaylistMutationResult =
  Apollo.MutationResult<Types.ConvertToSpotifyPlaylistMutation>;
export type ConvertToSpotifyPlaylistMutationOptions =
  Apollo.BaseMutationOptions<
    Types.ConvertToSpotifyPlaylistMutation,
    Types.ConvertToSpotifyPlaylistMutationVariables
  >;
export const ConvertToYoutubePlaylistDocument = gql`
  mutation ConvertToYoutubePlaylist($listJSON: [PlaylistJSONInput!]!) {
    convertToYoutubePlaylist(listJSON: $listJSON)
  }
`;
export type ConvertToYoutubePlaylistMutationFn = Apollo.MutationFunction<
  Types.ConvertToYoutubePlaylistMutation,
  Types.ConvertToYoutubePlaylistMutationVariables
>;

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
export function useConvertToYoutubePlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ConvertToYoutubePlaylistMutation,
    Types.ConvertToYoutubePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ConvertToYoutubePlaylistMutation,
    Types.ConvertToYoutubePlaylistMutationVariables
  >(ConvertToYoutubePlaylistDocument, options);
}
export type ConvertToYoutubePlaylistMutationHookResult = ReturnType<
  typeof useConvertToYoutubePlaylistMutation
>;
export type ConvertToYoutubePlaylistMutationResult =
  Apollo.MutationResult<Types.ConvertToYoutubePlaylistMutation>;
export type ConvertToYoutubePlaylistMutationOptions =
  Apollo.BaseMutationOptions<
    Types.ConvertToYoutubePlaylistMutation,
    Types.ConvertToYoutubePlaylistMutationVariables
  >;
export const UpdateUserDocument = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput)
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>;

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
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<Types.UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>;
export const SaveStatisticDocument = gql`
  mutation SaveStatistic($saveStatisticInput: SaveStatisticInput!) {
    saveStatistic(saveStatisticInput: $saveStatisticInput)
  }
`;
export type SaveStatisticMutationFn = Apollo.MutationFunction<
  Types.SaveStatisticMutation,
  Types.SaveStatisticMutationVariables
>;

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
export function useSaveStatisticMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SaveStatisticMutation,
    Types.SaveStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SaveStatisticMutation,
    Types.SaveStatisticMutationVariables
  >(SaveStatisticDocument, options);
}
export type SaveStatisticMutationHookResult = ReturnType<
  typeof useSaveStatisticMutation
>;
export type SaveStatisticMutationResult =
  Apollo.MutationResult<Types.SaveStatisticMutation>;
export type SaveStatisticMutationOptions = Apollo.BaseMutationOptions<
  Types.SaveStatisticMutation,
  Types.SaveStatisticMutationVariables
>;
export const UpdateStatisticDocument = gql`
  mutation UpdateStatistic($updateStatisticInput: UpdateStatisticInput!) {
    updateStatistic(updateStatisticInput: $updateStatisticInput) {
      user {
        id
        name
      }
    }
  }
`;
export type UpdateStatisticMutationFn = Apollo.MutationFunction<
  Types.UpdateStatisticMutation,
  Types.UpdateStatisticMutationVariables
>;

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
export function useUpdateStatisticMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateStatisticMutation,
    Types.UpdateStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateStatisticMutation,
    Types.UpdateStatisticMutationVariables
  >(UpdateStatisticDocument, options);
}
export type UpdateStatisticMutationHookResult = ReturnType<
  typeof useUpdateStatisticMutation
>;
export type UpdateStatisticMutationResult =
  Apollo.MutationResult<Types.UpdateStatisticMutation>;
export type UpdateStatisticMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateStatisticMutation,
  Types.UpdateStatisticMutationVariables
>;
export const RemoveStatisticDocument = gql`
  mutation RemoveStatistic($userId: ID!) {
    removeStatistic(userId: $userId) {
      userId
    }
  }
`;
export type RemoveStatisticMutationFn = Apollo.MutationFunction<
  Types.RemoveStatisticMutation,
  Types.RemoveStatisticMutationVariables
>;

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
export function useRemoveStatisticMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RemoveStatisticMutation,
    Types.RemoveStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RemoveStatisticMutation,
    Types.RemoveStatisticMutationVariables
  >(RemoveStatisticDocument, options);
}
export type RemoveStatisticMutationHookResult = ReturnType<
  typeof useRemoveStatisticMutation
>;
export type RemoveStatisticMutationResult =
  Apollo.MutationResult<Types.RemoveStatisticMutation>;
export type RemoveStatisticMutationOptions = Apollo.BaseMutationOptions<
  Types.RemoveStatisticMutation,
  Types.RemoveStatisticMutationVariables
>;
export const GetUserDocument = gql`
  query GetUser {
    user {
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
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetUserQuery,
    Types.GetUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetUserQuery,
    Types.GetUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.GetUserQuery,
        Types.GetUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.GetUserQuery,
    Types.GetUserQueryVariables
  >(GetUserDocument, options);
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUserSuspenseQuery
>;
export type GetUserQueryResult = Apollo.QueryResult<
  Types.GetUserQuery,
  Types.GetUserQueryVariables
>;
export const GetPlaylistDocument = gql`
  query GetPlaylist($id: Int!) {
    playlist(id: $id) {
      id
      name
      createdAt
      listJson {
        title
        artist
        album
        thumbnail
      }
      user {
        id
        name
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
export function useGetPlaylistQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetPlaylistQuery,
    Types.GetPlaylistQueryVariables
  > &
    (
      | { variables: Types.GetPlaylistQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetPlaylistQuery,
    Types.GetPlaylistQueryVariables
  >(GetPlaylistDocument, options);
}
export function useGetPlaylistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPlaylistQuery,
    Types.GetPlaylistQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetPlaylistQuery,
    Types.GetPlaylistQueryVariables
  >(GetPlaylistDocument, options);
}
export function useGetPlaylistSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.GetPlaylistQuery,
        Types.GetPlaylistQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.GetPlaylistQuery,
    Types.GetPlaylistQueryVariables
  >(GetPlaylistDocument, options);
}
export type GetPlaylistQueryHookResult = ReturnType<typeof useGetPlaylistQuery>;
export type GetPlaylistLazyQueryHookResult = ReturnType<
  typeof useGetPlaylistLazyQuery
>;
export type GetPlaylistSuspenseQueryHookResult = ReturnType<
  typeof useGetPlaylistSuspenseQuery
>;
export type GetPlaylistQueryResult = Apollo.QueryResult<
  Types.GetPlaylistQuery,
  Types.GetPlaylistQueryVariables
>;
export const GetPlaylistsPageDocument = gql`
  query GetPlaylistsPage(
    $limit: Int!
    $orderBy: String!
    $page: Int!
    $isListJson: Boolean!
  ) {
    playlistsPage(limit: $limit, orderBy: $orderBy, page: $page) {
      playlists {
        id
        name
        createdAt
        listJson @include(if: $isListJson) {
          title
          artist
          album
        }
      }
      totalPages
    }
  }
`;

/**
 * __useGetPlaylistsPageQuery__
 *
 * To run a query within a React component, call `useGetPlaylistsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistsPageQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetPlaylistsPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetPlaylistsPageQuery,
    Types.GetPlaylistsPageQueryVariables
  > &
    (
      | { variables: Types.GetPlaylistsPageQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetPlaylistsPageQuery,
    Types.GetPlaylistsPageQueryVariables
  >(GetPlaylistsPageDocument, options);
}
export function useGetPlaylistsPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPlaylistsPageQuery,
    Types.GetPlaylistsPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetPlaylistsPageQuery,
    Types.GetPlaylistsPageQueryVariables
  >(GetPlaylistsPageDocument, options);
}
export function useGetPlaylistsPageSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.GetPlaylistsPageQuery,
        Types.GetPlaylistsPageQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.GetPlaylistsPageQuery,
    Types.GetPlaylistsPageQueryVariables
  >(GetPlaylistsPageDocument, options);
}
export type GetPlaylistsPageQueryHookResult = ReturnType<
  typeof useGetPlaylistsPageQuery
>;
export type GetPlaylistsPageLazyQueryHookResult = ReturnType<
  typeof useGetPlaylistsPageLazyQuery
>;
export type GetPlaylistsPageSuspenseQueryHookResult = ReturnType<
  typeof useGetPlaylistsPageSuspenseQuery
>;
export type GetPlaylistsPageQueryResult = Apollo.QueryResult<
  Types.GetPlaylistsPageQuery,
  Types.GetPlaylistsPageQueryVariables
>;
export const GetStatisticDocument = gql`
  query GetStatistic($userId: ID!) {
    statistic(userId: $userId) {
      albumRankJson
      artistRankJson
      genreRankJson
      user {
        id
        name
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
export function useGetStatisticQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetStatisticQuery,
    Types.GetStatisticQueryVariables
  > &
    (
      | { variables: Types.GetStatisticQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetStatisticQuery,
    Types.GetStatisticQueryVariables
  >(GetStatisticDocument, options);
}
export function useGetStatisticLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetStatisticQuery,
    Types.GetStatisticQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetStatisticQuery,
    Types.GetStatisticQueryVariables
  >(GetStatisticDocument, options);
}
export function useGetStatisticSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.GetStatisticQuery,
        Types.GetStatisticQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.GetStatisticQuery,
    Types.GetStatisticQueryVariables
  >(GetStatisticDocument, options);
}
export type GetStatisticQueryHookResult = ReturnType<
  typeof useGetStatisticQuery
>;
export type GetStatisticLazyQueryHookResult = ReturnType<
  typeof useGetStatisticLazyQuery
>;
export type GetStatisticSuspenseQueryHookResult = ReturnType<
  typeof useGetStatisticSuspenseQuery
>;
export type GetStatisticQueryResult = Apollo.QueryResult<
  Types.GetStatisticQuery,
  Types.GetStatisticQueryVariables
>;
