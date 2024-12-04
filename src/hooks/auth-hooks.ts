import { useApolloClient, useQuery } from "@apollo/client";
import { SIGN_IN, SIGN_UP } from "@/graphql/mutations/user";
import { GET_USER } from "@/graphql/queries/user";
import { User } from "@/graphql/types/generated";

const token = localStorage.getItem("token");

export const useAuth = () => {
  const client = useApolloClient();

  const getUser = async (user: { id: string; username: string }) => {
    const { data } = useQuery<User>(GET_USER, {
      variables: { id: user?.id, username: user?.username },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return data;
  };

  const signIn = async (id: string, password: string) => {
    const { data } = await client.mutate({
      mutation: SIGN_IN,
      variables: { id, password },
    });
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  };

  const signUp = async (id: string, username: string, password: string) => {
    const { data } = await client.mutate({
      mutation: SIGN_UP,
      variables: { id, username, password },
    });
    return data;
  };

  const signOut = () => {
    localStorage.removeItem("token");
    client.clearStore();
  };

  return { getUser, signIn, signUp, signOut };
};
