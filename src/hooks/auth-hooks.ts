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
  const [signInMutation] = useSignInMutation();
  const [signUpMutation] = useSignUpMutation();
  const { data: userData } = useGetUserQuery({
    skip: !token,
    context: {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    },
  });

  const getUser = async () => {
    if (!token || !userData) {
      throw new Error("No token or user found");
    }
    return userData;
  };

  const isLoggedIn = () => {
    return !!token;
  };

  const signIn = async (id: string, password: string) => {
    try {
      const { data } = await signInMutation({
        variables: {
          signInInput: { id, password },
        },
      });

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
