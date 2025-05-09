/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from "./types";

export type SignUpMutationVariables = Types.Exact<{
  signUpInput: Types.SignUpInput;
}>;

export type SignUpMutation = { __typename?: "Mutation"; signUp: boolean };

export type SignInMutationVariables = Types.Exact<{
  signInInput: Types.SignInInput;
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "SignInResponse";
    accessToken: string;
    user: {
      __typename?: "User";
      id: string;
      name: string;
      profileImg?: string | null;
    };
  };
};

export type SignOutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: "Mutation"; signOut: boolean };

export type ChangePasswordMutationVariables = Types.Exact<{
  input: Types.ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "User";
    id: string;
    name: string;
    profileImg?: string | null;
  };
};

export type SavePlaylistMutationVariables = Types.Exact<{
  mutatePlaylistInput: Types.MutatePlaylistInput;
}>;

export type SavePlaylistMutation = {
  __typename?: "Mutation";
  savePlaylist: boolean;
};

export type RemovePlaylistMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type RemovePlaylistMutation = {
  __typename?: "Mutation";
  removePlaylist: boolean;
};

export type ReadPlaylistMutationVariables = Types.Exact<{
  link: Types.Scalars["String"]["input"];
}>;

export type ReadPlaylistMutation = {
  __typename?: "Mutation";
  readPlaylist: Array<{
    __typename?: "PlaylistJSON";
    title?: string | null;
    artist?: string | null;
    album?: string | null;
    thumbnail?: string | null;
  }>;
};

export type ConvertToYoutubePlaylistMutationVariables = Types.Exact<{
  listJSON: Array<Types.PlaylistJsonInput> | Types.PlaylistJsonInput;
  authorizationCode?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  state?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type ConvertToYoutubePlaylistMutation = {
  __typename?: "Mutation";
  convertToYoutubePlaylist:
    | {
        __typename: "AuthRequiredResponse";
        needsAuth: boolean;
        authUrl: string;
        apiDomain: Types.ApiDomain;
      }
    | {
        __typename: "ConvertedPlaylist";
        success: boolean;
        message: string;
        playlistId?: string | null;
        playlistName?: string | null;
        playlistUrl?: string | null;
      };
};

export type ConvertToSpotifyPlaylistMutationVariables = Types.Exact<{
  listJSON: Array<Types.PlaylistJsonInput> | Types.PlaylistJsonInput;
  authorizationCode?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  state?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type ConvertToSpotifyPlaylistMutation = {
  __typename?: "Mutation";
  convertToSpotifyPlaylist:
    | {
        __typename: "AuthRequiredResponse";
        needsAuth: boolean;
        authUrl: string;
        apiDomain: Types.ApiDomain;
      }
    | {
        __typename: "ConvertedPlaylist";
        success: boolean;
        message: string;
        playlistId?: string | null;
        playlistName?: string | null;
        playlistUrl?: string | null;
      };
};

export type UpdateUserMutationVariables = Types.Exact<{
  updateUserInput: Types.UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: boolean;
};

export type SaveStatisticMutationVariables = Types.Exact<{
  saveStatisticInput: Types.MutateStatisticInput;
}>;

export type SaveStatisticMutation = {
  __typename?: "Mutation";
  saveStatistic: boolean;
};

export type UpdateStatisticMutationVariables = Types.Exact<{
  updateStatisticInput: Types.MutateStatisticInput;
}>;

export type UpdateStatisticMutation = {
  __typename?: "Mutation";
  updateStatistic: {
    __typename?: "Statistic";
    userId: string;
    updatedAt: any;
    albumRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
    artistRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
    titleRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
  };
};

export type RemoveStatisticMutationVariables = Types.Exact<{
  userId: Types.Scalars["ID"]["input"];
}>;

export type RemoveStatisticMutation = {
  __typename?: "Mutation";
  removeStatistic: {
    __typename?: "Statistic";
    userId: string;
    updatedAt: any;
    albumRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
    artistRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
    titleRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
  };
};

export type CheckIdMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type CheckIdMutation = { __typename?: "Mutation"; checkId: boolean };

export type CheckPasswordMutationVariables = Types.Exact<{
  password: Types.Scalars["String"]["input"];
}>;

export type CheckPasswordMutation = {
  __typename?: "Mutation";
  checkPassword: boolean;
};

export type UpdatePlaylistMutationVariables = Types.Exact<{
  mutatePlaylistInput: Types.MutatePlaylistInput;
}>;

export type UpdatePlaylistMutation = {
  __typename?: "Mutation";
  updatePlaylist: boolean;
};

export type GetUserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: string;
    name: string;
    profileImg?: string | null;
  };
};

export type GetPlaylistQueryVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type GetPlaylistQuery = {
  __typename?: "Query";
  playlist: {
    __typename?: "Playlist";
    id: string;
    name: string;
    createdAt: any;
    thumbnail?: string | null;
    userId: string;
    listJson?: Array<{
      __typename?: "PlaylistJSON";
      title?: string | null;
      artist?: string | null;
      album?: string | null;
      thumbnail?: string | null;
    }> | null;
  };
};

export type GetPlaylistsPageQueryVariables = Types.Exact<{
  page: Types.Scalars["Int"]["input"];
  limit: Types.Scalars["Int"]["input"];
  orderBy: Types.Scalars["String"]["input"];
  includeListJson?: Types.InputMaybe<Types.Scalars["Boolean"]["input"]>;
}>;

export type GetPlaylistsPageQuery = {
  __typename?: "Query";
  playlistsPage: {
    __typename?: "PlaylistsResponse";
    totalPages: number;
    playlists: Array<{
      __typename?: "Playlist";
      id: string;
      name: string;
      createdAt: any;
      thumbnail?: string | null;
      userId: string;
      listJson?: Array<{
        __typename?: "PlaylistJSON";
        title?: string | null;
        artist?: string | null;
        album?: string | null;
        thumbnail?: string | null;
      }> | null;
    }>;
  };
};

export type GetStatisticQueryVariables = Types.Exact<{
  userId: Types.Scalars["ID"]["input"];
}>;

export type GetStatisticQuery = {
  __typename?: "Query";
  statistic: {
    __typename?: "Statistic";
    userId: string;
    updatedAt: any;
    albumRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
    artistRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
    titleRankJson: {
      __typename?: "StatisticRank";
      first: string;
      second: string;
      third: string;
    };
  };
};
