import { PlaylistsResponse, Playlist, Statistic } from "@/graphql/types";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let apolloClient: ApolloClient<any> | undefined;

function createApolloClient() {
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
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      credentials: "include",
    }),
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
