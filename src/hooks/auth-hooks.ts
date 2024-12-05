import { useApolloClient, useQuery } from "@apollo/client";
import { SIGN_IN, SIGN_OUT, SIGN_UP } from "@/graphql/mutations/user";
import { GET_USER } from "@/graphql/queries/user";
import { SignInResponse, User } from "@/graphql/types/generated";
import router from "next/router";

export const useAuth = () => {
  const client = useApolloClient();

  const getUser = async (user: { id: string; username: string }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const { data } = useQuery<User>(GET_USER, {
      variables: { id: user?.id, username: user?.username },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return data;
  };

  const signIn = async (id: string, password: string) => {
    const { data } = await client.mutate<SignInResponse>({
      mutation: SIGN_IN,
      variables: { id, password },
    });
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.accessToken);
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
      localStorage.removeItem("token");
      client.clearStore();
      router.push("/auth/sign-in");
    } else {
      alert("Failed to sign out");
    }
  };

  return { getUser, signIn, signUp, signOut };
};
