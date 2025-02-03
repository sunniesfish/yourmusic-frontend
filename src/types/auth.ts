import { User } from "@/graphql/types";

export interface AuthHookResult {
  signIn: (id: string, password: string) => Promise<boolean>;
  signUp: (id: string, username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  changePassword: (id: string, password: string) => Promise<boolean>;
  updateUser: (user: User) => Promise<boolean>;
  isLoggedIn: () => boolean;
  checkIdAvailability: (id: string) => Promise<boolean>;
  checkPassword: (password: string) => Promise<boolean>;
}
