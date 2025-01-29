import * as Operation from "./operations";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;

export const SignUpDocument = gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  Operation.SignUpMutation,
  Operation.SignUpMutationVariables
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
    Operation.SignUpMutation,
    Operation.SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.SignUpMutation,
    Operation.SignUpMutationVariables
  >(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult =
  Apollo.MutationResult<Operation.SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  Operation.SignUpMutation,
  Operation.SignUpMutationVariables
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
  Operation.SignInMutation,
  Operation.SignInMutationVariables
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
    Operation.SignInMutation,
    Operation.SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.SignInMutation,
    Operation.SignInMutationVariables
  >(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult =
  Apollo.MutationResult<Operation.SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  Operation.SignInMutation,
  Operation.SignInMutationVariables
>;
export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  Operation.SignOutMutation,
  Operation.SignOutMutationVariables
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
    Operation.SignOutMutation,
    Operation.SignOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.SignOutMutation,
    Operation.SignOutMutationVariables
  >(SignOutDocument, options);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult =
  Apollo.MutationResult<Operation.SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  Operation.SignOutMutation,
  Operation.SignOutMutationVariables
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
  Operation.ChangePasswordMutation,
  Operation.ChangePasswordMutationVariables
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
    Operation.ChangePasswordMutation,
    Operation.ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.ChangePasswordMutation,
    Operation.ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<Operation.ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  Operation.ChangePasswordMutation,
  Operation.ChangePasswordMutationVariables
>;
export const SavePlaylistDocument = gql`
  mutation SavePlaylist($savePlaylistInput: SavePlaylistInput!) {
    savePlaylist(savePlaylistInput: $savePlaylistInput)
  }
`;
export type SavePlaylistMutationFn = Apollo.MutationFunction<
  Operation.SavePlaylistMutation,
  Operation.SavePlaylistMutationVariables
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
    Operation.SavePlaylistMutation,
    Operation.SavePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.SavePlaylistMutation,
    Operation.SavePlaylistMutationVariables
  >(SavePlaylistDocument, options);
}
export type SavePlaylistMutationHookResult = ReturnType<
  typeof useSavePlaylistMutation
>;
export type SavePlaylistMutationResult =
  Apollo.MutationResult<Operation.SavePlaylistMutation>;
export type SavePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Operation.SavePlaylistMutation,
  Operation.SavePlaylistMutationVariables
>;
export const RemovePlaylistDocument = gql`
  mutation RemovePlaylist($id: Int!) {
    removePlaylist(id: $id) {
      id
      name
      createdAt
      listJson {
        title
        artist
        album
        thumbnail
      }
    }
  }
`;
export type RemovePlaylistMutationFn = Apollo.MutationFunction<
  Operation.RemovePlaylistMutation,
  Operation.RemovePlaylistMutationVariables
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
    Operation.RemovePlaylistMutation,
    Operation.RemovePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.RemovePlaylistMutation,
    Operation.RemovePlaylistMutationVariables
  >(RemovePlaylistDocument, options);
}
export type RemovePlaylistMutationHookResult = ReturnType<
  typeof useRemovePlaylistMutation
>;
export type RemovePlaylistMutationResult =
  Apollo.MutationResult<Operation.RemovePlaylistMutation>;
export type RemovePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Operation.RemovePlaylistMutation,
  Operation.RemovePlaylistMutationVariables
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
  Operation.ReadPlaylistMutation,
  Operation.ReadPlaylistMutationVariables
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
    Operation.ReadPlaylistMutation,
    Operation.ReadPlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.ReadPlaylistMutation,
    Operation.ReadPlaylistMutationVariables
  >(ReadPlaylistDocument, options);
}
export type ReadPlaylistMutationHookResult = ReturnType<
  typeof useReadPlaylistMutation
>;
export type ReadPlaylistMutationResult =
  Apollo.MutationResult<Operation.ReadPlaylistMutation>;
export type ReadPlaylistMutationOptions = Apollo.BaseMutationOptions<
  Operation.ReadPlaylistMutation,
  Operation.ReadPlaylistMutationVariables
>;
export const ConvertToYoutubePlaylistDocument = gql`
  mutation ConvertToYoutubePlaylist($listJSON: [PlaylistJSONInput!]!) {
    convertToYoutubePlaylist(listJSON: $listJSON) {
      success
      message
      playlistId
      playlistName
      playlistUrl
    }
  }
`;
export type ConvertToYoutubePlaylistMutationFn = Apollo.MutationFunction<
  Operation.ConvertToYoutubePlaylistMutation,
  Operation.ConvertToYoutubePlaylistMutationVariables
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
    Operation.ConvertToYoutubePlaylistMutation,
    Operation.ConvertToYoutubePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.ConvertToYoutubePlaylistMutation,
    Operation.ConvertToYoutubePlaylistMutationVariables
  >(ConvertToYoutubePlaylistDocument, options);
}
export type ConvertToYoutubePlaylistMutationHookResult = ReturnType<
  typeof useConvertToYoutubePlaylistMutation
>;
export type ConvertToYoutubePlaylistMutationResult =
  Apollo.MutationResult<Operation.ConvertToYoutubePlaylistMutation>;
export type ConvertToYoutubePlaylistMutationOptions =
  Apollo.BaseMutationOptions<
    Operation.ConvertToYoutubePlaylistMutation,
    Operation.ConvertToYoutubePlaylistMutationVariables
  >;
export const ConvertToSpotifyPlaylistDocument = gql`
  mutation ConvertToSpotifyPlaylist($listJSON: [PlaylistJSONInput!]!) {
    convertToSpotifyPlaylist(listJSON: $listJSON) {
      success
      message
      playlistId
      playlistName
      playlistUrl
    }
  }
`;
export type ConvertToSpotifyPlaylistMutationFn = Apollo.MutationFunction<
  Operation.ConvertToSpotifyPlaylistMutation,
  Operation.ConvertToSpotifyPlaylistMutationVariables
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
    Operation.ConvertToSpotifyPlaylistMutation,
    Operation.ConvertToSpotifyPlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.ConvertToSpotifyPlaylistMutation,
    Operation.ConvertToSpotifyPlaylistMutationVariables
  >(ConvertToSpotifyPlaylistDocument, options);
}
export type ConvertToSpotifyPlaylistMutationHookResult = ReturnType<
  typeof useConvertToSpotifyPlaylistMutation
>;
export type ConvertToSpotifyPlaylistMutationResult =
  Apollo.MutationResult<Operation.ConvertToSpotifyPlaylistMutation>;
export type ConvertToSpotifyPlaylistMutationOptions =
  Apollo.BaseMutationOptions<
    Operation.ConvertToSpotifyPlaylistMutation,
    Operation.ConvertToSpotifyPlaylistMutationVariables
  >;
export const UpdateUserDocument = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput)
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  Operation.UpdateUserMutation,
  Operation.UpdateUserMutationVariables
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
    Operation.UpdateUserMutation,
    Operation.UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.UpdateUserMutation,
    Operation.UpdateUserMutationVariables
  >(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<Operation.UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  Operation.UpdateUserMutation,
  Operation.UpdateUserMutationVariables
>;
export const SaveStatisticDocument = gql`
  mutation SaveStatistic($saveStatisticInput: MutateStatisticInput!) {
    saveStatistic(saveStatisticInput: $saveStatisticInput)
  }
`;
export type SaveStatisticMutationFn = Apollo.MutationFunction<
  Operation.SaveStatisticMutation,
  Operation.SaveStatisticMutationVariables
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
    Operation.SaveStatisticMutation,
    Operation.SaveStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.SaveStatisticMutation,
    Operation.SaveStatisticMutationVariables
  >(SaveStatisticDocument, options);
}
export type SaveStatisticMutationHookResult = ReturnType<
  typeof useSaveStatisticMutation
>;
export type SaveStatisticMutationResult =
  Apollo.MutationResult<Operation.SaveStatisticMutation>;
export type SaveStatisticMutationOptions = Apollo.BaseMutationOptions<
  Operation.SaveStatisticMutation,
  Operation.SaveStatisticMutationVariables
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
  Operation.UpdateStatisticMutation,
  Operation.UpdateStatisticMutationVariables
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
    Operation.UpdateStatisticMutation,
    Operation.UpdateStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.UpdateStatisticMutation,
    Operation.UpdateStatisticMutationVariables
  >(UpdateStatisticDocument, options);
}
export type UpdateStatisticMutationHookResult = ReturnType<
  typeof useUpdateStatisticMutation
>;
export type UpdateStatisticMutationResult =
  Apollo.MutationResult<Operation.UpdateStatisticMutation>;
export type UpdateStatisticMutationOptions = Apollo.BaseMutationOptions<
  Operation.UpdateStatisticMutation,
  Operation.UpdateStatisticMutationVariables
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
  Operation.RemoveStatisticMutation,
  Operation.RemoveStatisticMutationVariables
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
    Operation.RemoveStatisticMutation,
    Operation.RemoveStatisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.RemoveStatisticMutation,
    Operation.RemoveStatisticMutationVariables
  >(RemoveStatisticDocument, options);
}
export type RemoveStatisticMutationHookResult = ReturnType<
  typeof useRemoveStatisticMutation
>;
export type RemoveStatisticMutationResult =
  Apollo.MutationResult<Operation.RemoveStatisticMutation>;
export type RemoveStatisticMutationOptions = Apollo.BaseMutationOptions<
  Operation.RemoveStatisticMutation,
  Operation.RemoveStatisticMutationVariables
>;
export const CheckIdDocument = gql`
  mutation CheckId($id: String!) {
    checkId(id: $id)
  }
`;
export type CheckIdMutationFn = Apollo.MutationFunction<
  Operation.CheckIdMutation,
  Operation.CheckIdMutationVariables
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
    Operation.CheckIdMutation,
    Operation.CheckIdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.CheckIdMutation,
    Operation.CheckIdMutationVariables
  >(CheckIdDocument, options);
}
export type CheckIdMutationHookResult = ReturnType<typeof useCheckIdMutation>;
export type CheckIdMutationResult =
  Apollo.MutationResult<Operation.CheckIdMutation>;
export type CheckIdMutationOptions = Apollo.BaseMutationOptions<
  Operation.CheckIdMutation,
  Operation.CheckIdMutationVariables
>;
export const CheckPasswordDocument = gql`
  mutation CheckPassword($password: String!) {
    checkPassword(password: $password)
  }
`;
export type CheckPasswordMutationFn = Apollo.MutationFunction<
  Operation.CheckPasswordMutation,
  Operation.CheckPasswordMutationVariables
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
    Operation.CheckPasswordMutation,
    Operation.CheckPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operation.CheckPasswordMutation,
    Operation.CheckPasswordMutationVariables
  >(CheckPasswordDocument, options);
}
export type CheckPasswordMutationHookResult = ReturnType<
  typeof useCheckPasswordMutation
>;
export type CheckPasswordMutationResult =
  Apollo.MutationResult<Operation.CheckPasswordMutation>;
export type CheckPasswordMutationOptions = Apollo.BaseMutationOptions<
  Operation.CheckPasswordMutation,
  Operation.CheckPasswordMutationVariables
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
    Operation.GetUserQuery,
    Operation.GetUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operation.GetUserQuery,
    Operation.GetUserQueryVariables
  >(GetUserDocument, options);
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operation.GetUserQuery,
    Operation.GetUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operation.GetUserQuery,
    Operation.GetUserQueryVariables
  >(GetUserDocument, options);
}
export function useGetUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Operation.GetUserQuery,
        Operation.GetUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Operation.GetUserQuery,
    Operation.GetUserQueryVariables
  >(GetUserDocument, options);
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUserSuspenseQuery
>;
export type GetUserQueryResult = Apollo.QueryResult<
  Operation.GetUserQuery,
  Operation.GetUserQueryVariables
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
    Operation.GetPlaylistQuery,
    Operation.GetPlaylistQueryVariables
  > &
    (
      | { variables: Operation.GetPlaylistQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operation.GetPlaylistQuery,
    Operation.GetPlaylistQueryVariables
  >(GetPlaylistDocument, options);
}
export function useGetPlaylistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operation.GetPlaylistQuery,
    Operation.GetPlaylistQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operation.GetPlaylistQuery,
    Operation.GetPlaylistQueryVariables
  >(GetPlaylistDocument, options);
}
export function useGetPlaylistSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Operation.GetPlaylistQuery,
        Operation.GetPlaylistQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Operation.GetPlaylistQuery,
    Operation.GetPlaylistQueryVariables
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
  Operation.GetPlaylistQuery,
  Operation.GetPlaylistQueryVariables
>;
export const GetPlaylistsPageDocument = gql`
  query GetPlaylistsPage($page: Int!, $limit: Int!, $orderBy: String!) {
    playlistsPage(page: $page, limit: $limit, orderBy: $orderBy) {
      playlists {
        id
        name
        createdAt
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
 *   },
 * });
 */
export function useGetPlaylistsPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    Operation.GetPlaylistsPageQuery,
    Operation.GetPlaylistsPageQueryVariables
  > &
    (
      | { variables: Operation.GetPlaylistsPageQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operation.GetPlaylistsPageQuery,
    Operation.GetPlaylistsPageQueryVariables
  >(GetPlaylistsPageDocument, options);
}
export function useGetPlaylistsPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operation.GetPlaylistsPageQuery,
    Operation.GetPlaylistsPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operation.GetPlaylistsPageQuery,
    Operation.GetPlaylistsPageQueryVariables
  >(GetPlaylistsPageDocument, options);
}
export function useGetPlaylistsPageSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Operation.GetPlaylistsPageQuery,
        Operation.GetPlaylistsPageQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Operation.GetPlaylistsPageQuery,
    Operation.GetPlaylistsPageQueryVariables
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
  Operation.GetPlaylistsPageQuery,
  Operation.GetPlaylistsPageQueryVariables
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
    Operation.GetStatisticQuery,
    Operation.GetStatisticQueryVariables
  > &
    (
      | { variables: Operation.GetStatisticQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operation.GetStatisticQuery,
    Operation.GetStatisticQueryVariables
  >(GetStatisticDocument, options);
}
export function useGetStatisticLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operation.GetStatisticQuery,
    Operation.GetStatisticQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operation.GetStatisticQuery,
    Operation.GetStatisticQueryVariables
  >(GetStatisticDocument, options);
}
export function useGetStatisticSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Operation.GetStatisticQuery,
        Operation.GetStatisticQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Operation.GetStatisticQuery,
    Operation.GetStatisticQueryVariables
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
  Operation.GetStatisticQuery,
  Operation.GetStatisticQueryVariables
>;
