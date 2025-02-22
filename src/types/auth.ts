export interface AuthHookResult {
  signIn: (id: string, password: string) => Promise<boolean>;
  signUp: (id: string, username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isLoggedIn: () => boolean;
  checkIdAvailability: (id: string) => Promise<boolean>;
  token: string | undefined;
}
