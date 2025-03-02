"use client";

import { useApolloClient } from "@apollo/client";
import { useAuthStore } from "@/store/auth-store";
import { AuthHookResult } from "@/types/auth";
import {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useCheckIdMutation,
} from "@/graphql/hooks";
import { useCallback } from "react";
import { getClient } from "@/lib/apollo-client";

/**
 * Hook for handling authentication-related operations
 * @returns {AuthHookResult} Object containing authentication methods
 */
export const useAuth = (): AuthHookResult => {
  const client = useApolloClient();
  const { setUser, setToken, logout, token } = useAuthStore();
  const [signInMutation] = useSignInMutation();
  const [signUpMutation] = useSignUpMutation();
  const [checkIdMutation] = useCheckIdMutation();
  const [signOutMutation] = useSignOutMutation();

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
  const signIn = async (id: string, password: string): Promise<boolean> => {
    try {
      const response = await signInMutation({
        variables: { signInInput: { id, password } },
      });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data?.signIn) {
        throw new Error("Login failed");
      }

      const { user, accessToken } = response.data.signIn;
      setUser(user);
      setToken(accessToken);
      return true;
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
      update: () => {
        const client = getClient();
        client.clearStore();
      },
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

  return {
    signIn,
    signUp,
    signOut,
    isLoggedIn,
    checkIdAvailability,
    token,
  };
};
