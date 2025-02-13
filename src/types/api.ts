import { ApiDomain } from "@/graphql/types";

export type OAuthState = {
  domain: ApiDomain;
  id: string;
};
