import * as Apollo from "@apollo/client";
import * as Operations from "./operations";
import { gql } from "@apollo/client";
const defaultOptions = {} as const;

export const SignUpDocument = gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  Operations.SignUpMutation,
  Operations.SignUpMutationVariables
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
    Operations.SignUpMutation,
    Operations.SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.SignUpMutation,
    Operations.SignUpMutationVariables
  >(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult =
  Apollo.MutationResult<Operations.SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  Operations.SignUpMutation,
  Operations.SignUpMutationVariables
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
  Operations.SignInMutation,
  Operations.SignInMutationVariables
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
    Operations.SignInMutation,
    Operations.SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.SignInMutation,
    Operations.SignInMutationVariables
  >(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult =
  Apollo.MutationResult<Operations.SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  Operations.SignInMutation,
  Operations.SignInMutationVariables
>;
export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  Operations.SignOutMutation,
  Operations.SignOutMutationVariables
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
    Operations.SignOutMutation,
    Operations.SignOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.SignOutMutation,
    Operations.SignOutMutationVariables
  >(SignOutDocument, options);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult =
  Apollo.MutationResult<Operations.SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  Operations.SignOutMutation,
  Operations.SignOutMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id
      name
      profileImg
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  Operations.ChangePasswordMutation,
  Operations.ChangePasswordMutationVariables
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
    Operations.ChangePasswordMutation,
    Operations.ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.ChangePasswordMutation,
    Operations.ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<Operations.ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  Operations.ChangePasswordMutation,
  Operations.ChangePasswordMutationVariables
>;
export const SavePlaylistDocument = gql`
  mutation SavePlaylist($mutatePlaylistInput: MutatePlaylistInput!) {
    savePlaylist(mutatePlaylistInput: $mutatePlaylistInput)
  }
`;
export type SavePlaylistMutationFn = Apollo.MutationFunction<
  Operations.SavePlaylistMutation,
  Operations.SavePlaylistMutationVariables
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
 *      mutatePlaylistInput: // value for 'mutatePlaylistInput'
 *   },
 * });
 */
export function useSavePlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.SavePlaylistMutation,
    Operations.SavePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.SavePlaylistMutation,
    Operations.SavePlaylistMutationVariables
  >(SavePlaylistDocument, options);
}
export type SavePlaylistMutationHookResult = ReturnType<
  typeof useSavePlaylistMutation
>;
export type SavePlaylistMutationResult =
  Apollo.MutationResult<Operations.SavePlaylistMutation>;
export type SavePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Operations.SavePlaylistMutation,
  Operations.SavePlaylistMutationVariables
>;
export const RemovePlaylistDocument = gql`
  mutation RemovePlaylist($id: Int!) {
    removePlaylist(id: $id)
  }
`;
export type RemovePlaylistMutationFn = Apollo.MutationFunction<
  Operations.RemovePlaylistMutation,
  Operations.RemovePlaylistMutationVariables
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
    Operations.RemovePlaylistMutation,
    Operations.RemovePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.RemovePlaylistMutation,
    Operations.RemovePlaylistMutationVariables
  >(RemovePlaylistDocument, options);
}
export type RemovePlaylistMutationHookResult = ReturnType<
  typeof useRemovePlaylistMutation
>;
export type RemovePlaylistMutationResult =
  Apollo.MutationResult<Operations.RemovePlaylistMutation>;
export type RemovePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Operations.RemovePlaylistMutation,
  Operations.RemovePlaylistMutationVariables
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
  Operations.ReadPlaylistMutation,
  Operations.ReadPlaylistMutationVariables
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
    Operations.ReadPlaylistMutation,
    Operations.ReadPlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.ReadPlaylistMutation,
    Operations.ReadPlaylistMutationVariables
  >(ReadPlaylistDocument, options);
}
export type ReadPlaylistMutationHookResult = ReturnType<
  typeof useReadPlaylistMutation
>;
export type ReadPlaylistMutationResult =
  Apollo.MutationResult<Operations.ReadPlaylistMutation>;
export type ReadPlaylistMutationOptions = Apollo.BaseMutationOptions<
  Operations.ReadPlaylistMutation,
  Operations.ReadPlaylistMutationVariables
>;
export const ConvertToYoutubePlaylistDocument = gql`
  mutation ConvertToYoutubePlaylist(
    $listJSON: [PlaylistJSONInput!]!
    $authorizationCode: String
    $state: String
  ) {
    convertToYoutubePlaylist(
      listJSON: $listJSON
      authorizationCode: $authorizationCode
      state: $state
    ) {
      __typename
      ... on ConvertedPlaylist {
        success
        message
        playlistId
        playlistName
        playlistUrl
      }
      ... on AuthRequiredResponse {
        needsAuth
        authUrl
        apiDomain
      }
    }
  }
`;
export type ConvertToYoutubePlaylistMutationFn = Apollo.MutationFunction<
  Operations.ConvertToYoutubePlaylistMutation,
  Operations.ConvertToYoutubePlaylistMutationVariables
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
 *      authorizationCode: // value for 'authorizationCode'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useConvertToYoutubePlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.ConvertToYoutubePlaylistMutation,
    Operations.ConvertToYoutubePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.ConvertToYoutubePlaylistMutation,
    Operations.ConvertToYoutubePlaylistMutationVariables
  >(ConvertToYoutubePlaylistDocument, options);
}
export type ConvertToYoutubePlaylistMutationHookResult = ReturnType<
  typeof useConvertToYoutubePlaylistMutation
>;
export type ConvertToYoutubePlaylistMutationResult =
  Apollo.MutationResult<Operations.ConvertToYoutubePlaylistMutation>;
export type ConvertToYoutubePlaylistMutationOptions =
  Apollo.BaseMutationOptions<
    Operations.ConvertToYoutubePlaylistMutation,
    Operations.ConvertToYoutubePlaylistMutationVariables
  >;
export const ConvertToSpotifyPlaylistDocument = gql`
  mutation ConvertToSpotifyPlaylist(
    $listJSON: [PlaylistJSONInput!]!
    $authorizationCode: String
    $state: String
  ) {
    convertToSpotifyPlaylist(
      listJSON: $listJSON
      authorizationCode: $authorizationCode
      state: $state
    ) {
      __typename
      ... on ConvertedPlaylist {
        success
        message
        playlistId
        playlistName
        playlistUrl
      }
      ... on AuthRequiredResponse {
        needsAuth
        authUrl
        apiDomain
      }
    }
  }
`;
export type ConvertToSpotifyPlaylistMutationFn = Apollo.MutationFunction<
  Operations.ConvertToSpotifyPlaylistMutation,
  Operations.ConvertToSpotifyPlaylistMutationVariables
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
 *      authorizationCode: // value for 'authorizationCode'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useConvertToSpotifyPlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.ConvertToSpotifyPlaylistMutation,
    Operations.ConvertToSpotifyPlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.ConvertToSpotifyPlaylistMutation,
    Operations.ConvertToSpotifyPlaylistMutationVariables
  >(ConvertToSpotifyPlaylistDocument, options);
}
export type ConvertToSpotifyPlaylistMutationHookResult = ReturnType<
  typeof useConvertToSpotifyPlaylistMutation
>;
export type ConvertToSpotifyPlaylistMutationResult =
  Apollo.MutationResult<Operations.ConvertToSpotifyPlaylistMutation>;
export type ConvertToSpotifyPlaylistMutationOptions =
  Apollo.BaseMutationOptions<
    Operations.ConvertToSpotifyPlaylistMutation,
    Operations.ConvertToSpotifyPlaylistMutationVariables
  >;
export const UpdateUserDocument = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput)
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  Operations.UpdateUserMutation,
  Operations.UpdateUserMutationVariables
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
    Operations.UpdateUserMutation,
    Operations.UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.UpdateUserMutation,
    Operations.UpdateUserMutationVariables
  >(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<Operations.UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  Operations.UpdateUserMutation,
  Operations.UpdateUserMutationVariables
>;
export const SaveStatisticDocument = gql`
  mutation SaveStatistic($saveStatisticInput: MutateStatisticInput!) {
    saveStatistic(saveStatisticInput: $saveStatisticInput)
  }
`;
export type SaveStatisticMutationFn = Apollo.MutationFunction<
  Operations.SaveStatisticMutation,
  Operations.SaveStatisticMutationVariables
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
    Operations.SaveStatisticMutation,
    Operations.SaveStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.SaveStatisticMutation,
    Operations.SaveStatisticMutationVariables
  >(SaveStatisticDocument, options);
}
export type SaveStatisticMutationHookResult = ReturnType<
  typeof useSaveStatisticMutation
>;
export type SaveStatisticMutationResult =
  Apollo.MutationResult<Operations.SaveStatisticMutation>;
export type SaveStatisticMutationOptions = Apollo.BaseMutationOptions<
  Operations.SaveStatisticMutation,
  Operations.SaveStatisticMutationVariables
>;
export const UpdateStatisticDocument = gql`
  mutation UpdateStatistic($updateStatisticInput: MutateStatisticInput!) {
    updateStatistic(updateStatisticInput: $updateStatisticInput) {
      userId
      albumRankJson {
        first
        second
        third
      }
      artistRankJson {
        first
        second
        third
      }
      titleRankJson {
        first
        second
        third
      }
      updatedAt
    }
  }
`;
export type UpdateStatisticMutationFn = Apollo.MutationFunction<
  Operations.UpdateStatisticMutation,
  Operations.UpdateStatisticMutationVariables
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
    Operations.UpdateStatisticMutation,
    Operations.UpdateStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.UpdateStatisticMutation,
    Operations.UpdateStatisticMutationVariables
  >(UpdateStatisticDocument, options);
}
export type UpdateStatisticMutationHookResult = ReturnType<
  typeof useUpdateStatisticMutation
>;
export type UpdateStatisticMutationResult =
  Apollo.MutationResult<Operations.UpdateStatisticMutation>;
export type UpdateStatisticMutationOptions = Apollo.BaseMutationOptions<
  Operations.UpdateStatisticMutation,
  Operations.UpdateStatisticMutationVariables
>;
export const RemoveStatisticDocument = gql`
  mutation RemoveStatistic($userId: ID!) {
    removeStatistic(userId: $userId) {
      userId
      albumRankJson {
        first
        second
        third
      }
      artistRankJson {
        first
        second
        third
      }
      titleRankJson {
        first
        second
        third
      }
      updatedAt
    }
  }
`;
export type RemoveStatisticMutationFn = Apollo.MutationFunction<
  Operations.RemoveStatisticMutation,
  Operations.RemoveStatisticMutationVariables
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
    Operations.RemoveStatisticMutation,
    Operations.RemoveStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.RemoveStatisticMutation,
    Operations.RemoveStatisticMutationVariables
  >(RemoveStatisticDocument, options);
}
export type RemoveStatisticMutationHookResult = ReturnType<
  typeof useRemoveStatisticMutation
>;
export type RemoveStatisticMutationResult =
  Apollo.MutationResult<Operations.RemoveStatisticMutation>;
export type RemoveStatisticMutationOptions = Apollo.BaseMutationOptions<
  Operations.RemoveStatisticMutation,
  Operations.RemoveStatisticMutationVariables
>;
export const CheckIdDocument = gql`
  mutation CheckId($id: String!) {
    checkId(id: $id)
  }
`;
export type CheckIdMutationFn = Apollo.MutationFunction<
  Operations.CheckIdMutation,
  Operations.CheckIdMutationVariables
>;

/**
 * __useCheckIdMutation__
 *
 * To run a mutation, you first call `useCheckIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkIdMutation, { data, loading, error }] = useCheckIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CheckIdMutation,
    Operations.CheckIdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CheckIdMutation,
    Operations.CheckIdMutationVariables
  >(CheckIdDocument, options);
}
export type CheckIdMutationHookResult = ReturnType<typeof useCheckIdMutation>;
export type CheckIdMutationResult =
  Apollo.MutationResult<Operations.CheckIdMutation>;
export type CheckIdMutationOptions = Apollo.BaseMutationOptions<
  Operations.CheckIdMutation,
  Operations.CheckIdMutationVariables
>;
export const CheckPasswordDocument = gql`
  mutation CheckPassword($password: String!) {
    checkPassword(password: $password)
  }
`;
export type CheckPasswordMutationFn = Apollo.MutationFunction<
  Operations.CheckPasswordMutation,
  Operations.CheckPasswordMutationVariables
>;

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
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCheckPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CheckPasswordMutation,
    Operations.CheckPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CheckPasswordMutation,
    Operations.CheckPasswordMutationVariables
  >(CheckPasswordDocument, options);
}
export type CheckPasswordMutationHookResult = ReturnType<
  typeof useCheckPasswordMutation
>;
export type CheckPasswordMutationResult =
  Apollo.MutationResult<Operations.CheckPasswordMutation>;
export type CheckPasswordMutationOptions = Apollo.BaseMutationOptions<
  Operations.CheckPasswordMutation,
  Operations.CheckPasswordMutationVariables
>;
export const UpdatePlaylistDocument = gql`
  mutation UpdatePlaylist($mutatePlaylistInput: MutatePlaylistInput!) {
    updatePlaylist(mutatePlaylistInput: $mutatePlaylistInput)
  }
`;
export type UpdatePlaylistMutationFn = Apollo.MutationFunction<
  Operations.UpdatePlaylistMutation,
  Operations.UpdatePlaylistMutationVariables
>;

/**
 * __useUpdatePlaylistMutation__
 *
 * To run a mutation, you first call `useUpdatePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlaylistMutation, { data, loading, error }] = useUpdatePlaylistMutation({
 *   variables: {
 *      mutatePlaylistInput: // value for 'mutatePlaylistInput'
 *   },
 * });
 */
export function useUpdatePlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.UpdatePlaylistMutation,
    Operations.UpdatePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.UpdatePlaylistMutation,
    Operations.UpdatePlaylistMutationVariables
  >(UpdatePlaylistDocument, options);
}
export type UpdatePlaylistMutationHookResult = ReturnType<
  typeof useUpdatePlaylistMutation
>;
export type UpdatePlaylistMutationResult =
  Apollo.MutationResult<Operations.UpdatePlaylistMutation>;
export type UpdatePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Operations.UpdatePlaylistMutation,
  Operations.UpdatePlaylistMutationVariables
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
    Operations.GetUserQuery,
    Operations.GetUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.GetUserQuery,
    Operations.GetUserQueryVariables
  >(GetUserDocument, options);
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.GetUserQuery,
    Operations.GetUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.GetUserQuery,
    Operations.GetUserQueryVariables
  >(GetUserDocument, options);
}
export function useGetUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Operations.GetUserQuery,
        Operations.GetUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Operations.GetUserQuery,
    Operations.GetUserQueryVariables
  >(GetUserDocument, options);
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUserSuspenseQuery
>;
export type GetUserQueryResult = Apollo.QueryResult<
  Operations.GetUserQuery,
  Operations.GetUserQueryVariables
>;
export const GetPlaylistDocument = gql`
  query GetPlaylist($id: Int!) {
    playlist(id: $id) {
      id
      name
      createdAt
      thumbnail
      userId
      listJson {
        title
        artist
        album
        thumbnail
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
    Operations.GetPlaylistQuery,
    Operations.GetPlaylistQueryVariables
  > &
    (
      | { variables: Operations.GetPlaylistQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.GetPlaylistQuery,
    Operations.GetPlaylistQueryVariables
  >(GetPlaylistDocument, options);
}
export function useGetPlaylistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.GetPlaylistQuery,
    Operations.GetPlaylistQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.GetPlaylistQuery,
    Operations.GetPlaylistQueryVariables
  >(GetPlaylistDocument, options);
}
export function useGetPlaylistSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Operations.GetPlaylistQuery,
        Operations.GetPlaylistQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Operations.GetPlaylistQuery,
    Operations.GetPlaylistQueryVariables
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
  Operations.GetPlaylistQuery,
  Operations.GetPlaylistQueryVariables
>;
export const GetPlaylistsPageDocument = gql`
  query GetPlaylistsPage(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $includeListJson: Boolean = false
  ) {
    playlistsPage(page: $page, limit: $limit, orderBy: $orderBy) {
      playlists {
        id
        name
        createdAt
        thumbnail
        userId
        listJson @include(if: $includeListJson) {
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
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *      includeListJson: // value for 'includeListJson'
 *   },
 * });
 */
export function useGetPlaylistsPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    Operations.GetPlaylistsPageQuery,
    Operations.GetPlaylistsPageQueryVariables
  > &
    (
      | { variables: Operations.GetPlaylistsPageQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.GetPlaylistsPageQuery,
    Operations.GetPlaylistsPageQueryVariables
  >(GetPlaylistsPageDocument, options);
}
export function useGetPlaylistsPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.GetPlaylistsPageQuery,
    Operations.GetPlaylistsPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.GetPlaylistsPageQuery,
    Operations.GetPlaylistsPageQueryVariables
  >(GetPlaylistsPageDocument, options);
}
export function useGetPlaylistsPageSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Operations.GetPlaylistsPageQuery,
        Operations.GetPlaylistsPageQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Operations.GetPlaylistsPageQuery,
    Operations.GetPlaylistsPageQueryVariables
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
  Operations.GetPlaylistsPageQuery,
  Operations.GetPlaylistsPageQueryVariables
>;
export const GetStatisticDocument = gql`
  query GetStatistic($userId: ID!) {
    statistic(userId: $userId) {
      userId
      albumRankJson {
        first
        second
        third
      }
      artistRankJson {
        first
        second
        third
      }
      titleRankJson {
        first
        second
        third
      }
      updatedAt
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
    Operations.GetStatisticQuery,
    Operations.GetStatisticQueryVariables
  > &
    (
      | { variables: Operations.GetStatisticQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.GetStatisticQuery,
    Operations.GetStatisticQueryVariables
  >(GetStatisticDocument, options);
}
export function useGetStatisticLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.GetStatisticQuery,
    Operations.GetStatisticQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.GetStatisticQuery,
    Operations.GetStatisticQueryVariables
  >(GetStatisticDocument, options);
}
export function useGetStatisticSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Operations.GetStatisticQuery,
        Operations.GetStatisticQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Operations.GetStatisticQuery,
    Operations.GetStatisticQueryVariables
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
  Operations.GetStatisticQuery,
  Operations.GetStatisticQueryVariables
>;
