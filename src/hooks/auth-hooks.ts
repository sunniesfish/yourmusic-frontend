import { useApolloClient } from "@apollo/client";
import router from "next/router";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/graphql/types";
import {
  useGetUserQuery,
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
} from "@/graphql/hooks";

export const useAuth = () => {
  const client = useApolloClient();
  const { setUser, setToken, logout, token } = useAuthStore();

  const getUser = async () => {
    if (!token) {
      throw new Error("No token or user found");
    }
    const { data } = useGetUserQuery({
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
    const [mutate] = useSignInMutation({
      variables: { signInInput: { id, password } },
    });
    const data = await mutate();
    if (data.data) {
      setUser(data.data.signIn.user);
      setToken(data.data.signIn.accessToken);
    }
    return data.data ? true : false;
  };

  const signUp = async (id: string, username: string, password: string) => {
    const [mutate] = useSignUpMutation({
      variables: { signUpInput: { id, name: username, password } },
    });
    const data = await mutate();
    return data.data ? data.data.signUp : false;
  };

  const signOut = async () => {
    const [mutate] = useSignOutMutation({
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    const data = await mutate();
    if (data.data?.signOut) {
      logout();
      client.clearStore();
      router.push("/auth/sign-in");
    } else {
      alert("Failed to sign out");
    }
  };

  const updateUser = async (user: User) => {
    const [mutate] = useUpdateUserMutation({
      variables: { updateUserInput: user },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    const data = await mutate();
    return data.data ? data.data.updateUser : false;
  };

  const changePassword = async (id: string, password: string) => {
    const [mutate] = useChangePasswordMutation({
      variables: { input: { id, password } },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    const data = await mutate();
    return data.data ? true : false;
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
