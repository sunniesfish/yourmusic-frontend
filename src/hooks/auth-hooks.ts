import { useApolloClient, useQuery, useMutation } from "@apollo/client";
import {
  CHANGE_PASSWORD,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  UPDATE_USER,
} from "@/graphql/mutations/user";
import { GET_USER } from "@/graphql/queries/user";
import { SignInResponse, User } from "@/graphql/types/generated";
import router from "next/router";
import { useAuthStore } from "@/store/auth-store";

export const useAuth = () => {
  const client = useApolloClient();
  const { setUser, setToken, logout, token } = useAuthStore();

  const getUser = async () => {
    if (!token) {
      throw new Error("No token or user found");
    }
    const { data } = useQuery<User>(GET_USER, {
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    if (data) {
      setUser(data);
    }
    return data;
  };

  const isLoggedIn = () => {
    return !!token;
  };

  const signIn = async (id: string, password: string) => {
    const { data } = await client.mutate<SignInResponse>({
      mutation: SIGN_IN,
      variables: { id, password },
    });
    if (data) {
      setUser(data.user);
      setToken(data.accessToken);
    }
    return data;
  };

  const signUp = async (id: string, username: string, password: string) => {
    const { data } = await client.mutate<boolean>({
      mutation: SIGN_UP,
      variables: { id, username, password },
    });
    return data ? data : false;
  };

  const signOut = async () => {
    const { data } = await client.mutate<boolean>({
      mutation: SIGN_OUT,
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    if (data) {
      logout();
      client.clearStore();
      router.push("/auth/sign-in");
    } else {
      alert("Failed to sign out");
    }
  };

  const updateUser = async (user: User) => {
    const { data } = await client.mutate<boolean>({
      mutation: UPDATE_USER,
      variables: { user },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return data ? data : false;
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const { data } = await client.mutate<boolean>({
      mutation: CHANGE_PASSWORD,
      variables: { oldPassword, newPassword },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return data ? data : false;
  };

  return {
    getUser,
    signIn,
    signUp,
    signOut,
    changePassword,
    updateUser,
    isLoggedIn,
  };
};
