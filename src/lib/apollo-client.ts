// lib/apollo-client-server.ts (또는 공유 클라이언트 설정 파일)
import { PlaylistsResponse, Playlist, Statistic } from "@/graphql/types";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  NormalizedCacheObject,
  Operation,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { OperationTypeNode } from "graphql";
declare module "@apollo/client" {
  export interface DefaultContext {
    includeCredentials?: boolean;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function shouldIncludeCredentials(operation: any, context: any): boolean {
  if (context?.includeCredentials) {
    return true;
  }

  const definition = operation.query.definitions.find(
    (def: any) => def.kind === "OperationDefinition"
  );
  if (definition?.operation === OperationTypeNode.MUTATION) {
    return true;
  }

  return false;
}

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL, // credentials: "include" 여기서 제거
  });

  const credentialsLink = setContext((operation, prevContext) => {
    const { headers, fetchOptions: prevFetchOptions, ...rest } = prevContext;

    const shouldIncludeCreds = shouldIncludeCredentials(operation, prevContext);

    const newFetchOptions: RequestInit = shouldIncludeCreds
      ? { credentials: "include" }
      : { credentials: "omit" };

    return {
      headers,
      ...rest,
      fetchOptions: {
        ...prevFetchOptions,
        ...newFetchOptions,
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            PlaylistsPage: {
              keyArgs: ["orderBy"],
              merge(
                existing: PlaylistsResponse | undefined,
                incoming: PlaylistsResponse, // eslint-disable-next-line @typescript-eslint/no-explicit-any
                { args }: any
              ) {
                if (!existing || !args?.page || args.page === 1) {
                  return incoming;
                }
                return {
                  ...incoming,
                  playlists: [...existing.playlists, ...incoming.playlists],
                };
              },
            },
            playlist: {
              keyArgs: ["id"],
              merge(existing: Playlist | undefined, incoming: Playlist) {
                if (!existing) {
                  return incoming;
                }
                return {
                  ...existing,
                  name: incoming.name,
                };
              },
            },
            statistic: {
              keyArgs: ["userId"],
              merge(incoming: Statistic) {
                return incoming;
              },
            },
            user: {
              keyArgs: ["id"],
            },
          },
        },
      },
    }),
    link: from([credentialsLink, httpLink]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "cache-first",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
        fetchPolicy: "no-cache",
      },
    },
  });
}

export function getClient() {
  if (typeof window === "undefined") {
    return createApolloClient();
  }

  if (!apolloClient) {
    apolloClient = createApolloClient();
  }

  return apolloClient;
}
