import { useApolloClient, useQuery } from "@apollo/client";
import { SIGN_IN, SIGN_OUT, SIGN_UP } from "@/graphql/mutations/user";
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
    });
    if (data) {
      logout();
      client.clearStore();
      router.push("/auth/sign-in");
    } else {
      alert("Failed to sign out");
    }
  };

  return { getUser, signIn, signUp, signOut };
};
