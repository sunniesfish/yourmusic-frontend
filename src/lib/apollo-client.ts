import { PlaylistsResponse, Playlist, Statistic } from "@/graphql/types";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Apollo Client의 context 타입 확장
declare module "@apollo/client" {
  export interface DefaultContext {
    includeCredentials?: boolean;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  // HTTP 링크 생성 (credentials 없이)
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
  });

  // credentials 컨텍스트 추가 링크
  const credentialsLink = setContext((operation, prevContext) => {
    const { headers } = prevContext;
    // mutation은 항상 credentials 포함
    // context에서 명시적으로 includeCredentials가 설정되었는지 확인
    const isMutation = operation.operationName === "mutation";
    const shouldIncludeCredentials =
      prevContext.includeCredentials || isMutation;

    return {
      headers,
      credentials: shouldIncludeCredentials ? "include" : "omit",
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
                incoming: PlaylistsResponse,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// 쿼리 호출 시 credentials 포함 예시:
// client.query({
//   query: GET_DATA,
//   variables: { id: 1 },
//   context: { includeCredentials: true }
// });
