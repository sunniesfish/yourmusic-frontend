"use client";

import { useApolloClient } from "@apollo/client";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/graphql/types";
import { AuthHookResult } from "@/types/auth";
import {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useCheckIdMutation,
  useCheckPasswordMutation,
} from "@/graphql/hooks";
import { useCallback } from "react";

/**
 * Hook for handling authentication-related operations
 * @returns {AuthHookResult} Object containing authentication methods
 */
export const useAuth = (): AuthHookResult => {
  const client = useApolloClient();
  const { setUser, setToken, logout, token, user } = useAuthStore();
  const [signInMutation] = useSignInMutation();
  const [signUpMutation] = useSignUpMutation();
  const [checkIdMutation] = useCheckIdMutation();
  const [signOutMutation] = useSignOutMutation();
  const [checkPasswordMutation] = useCheckPasswordMutation();
  const [updateUserMutation] = useUpdateUserMutation();
  const [changePasswordMutation] = useChangePasswordMutation();

  /**
   * Checks if user is currently logged in
   * @returns {boolean} True if user is logged in
   */
  const isLoggedIn = useCallback(() => {
    return !!token;
  }, [token]);

  /**
   * Signs in a user with provided credentials
   * @param {string} id - User ID
   * @param {string} password - User password
   * @returns {Promise<boolean>} Success status
   */
  const signIn = async (id: string, password: string) => {
    try {
      const { data } = await signInMutation({
        variables: {
          signInInput: { id, password },
        },
      });
      console.log("signIn data", data);
      if (data) {
        setUser(data.signIn.user);
        setToken(data.signIn.accessToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Sign in failed:", error);
      return false;
    }
  };

  /**
   * Signs up a new user
   * @param {string} id - User ID
   * @param {string} username - User's display name
   * @param {string} password - User password
   * @returns {Promise<boolean>} Success status
   */
  const signUp = async (id: string, username: string, password: string) => {
    const { data } = await signUpMutation({
      variables: { signUpInput: { id, name: username, password } },
    });
    return data?.signUp ? true : false;
  };

  /**
   * Signs out the current user
   * @returns {Promise<void>}
   */
  const signOut = async () => {
    const { data } = await signOutMutation({
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    if (data?.signOut) {
      logout();
      client.clearStore();
    } else {
      alert("Failed to sign out");
    }
  };

  /**
   * Checks availability of a user ID
   * @param {string} id - User ID to check
   * @returns {Promise<boolean>} True if ID is available, false if already taken
   */
  const checkIdAvailability = async (id: string) => {
    const { data } = await checkIdMutation({
      variables: { id },
    });
    return data?.checkId ? false : true;
  };

  /**
   * Updates user profile information
   * @param {User} user - Updated user data
   * @returns {Promise<boolean>} True if update was successful
   * @throws {Error} When update fails
   */
  const updateUser = async (user: User): Promise<boolean> => {
    try {
      const { data } = await updateUserMutation({
        variables: { updateUserInput: user },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });
      return data?.updateUser || false;
    } catch (error) {
      console.error("Update user failed:", error);
      return false;
    }
  };

  /**
   * Changes user password
   * @param {string} id - User ID
   * @param {string} password - New password
   * @returns {Promise<boolean>} True if password change was successful
   */
  const changePassword = async (id: string, password: string) => {
    const { data } = await changePasswordMutation({
      variables: { input: { id, password } },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return data?.changePassword ? true : false;
  };

  /**
   * Validates user password
   * @param {string} password - Password to check
   * @returns {Promise<boolean>} True if password is valid
   */
  const checkPassword = async (password: string) => {
    const { data } = await checkPasswordMutation({
      variables: { password },
    });
    return data?.checkPassword ? true : false;
  };

  return {
    signIn,
    signUp,
    signOut,
    changePassword,
    updateUser,
    isLoggedIn,
    checkIdAvailability,
    checkPassword,
  };
};
