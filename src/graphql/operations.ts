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
  changePassword: { __typename?: "User"; id: string; name: string };
};

export type SavePlaylistMutationVariables = Types.Exact<{
  savePlaylistInput: Types.SavePlaylistInput;
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
  removePlaylist: { __typename?: "Playlist"; id: string; name: string };
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

export type ConvertToSpotifyPlaylistMutationVariables = Types.Exact<{
  listJSON: Array<Types.PlaylistJsonInput> | Types.PlaylistJsonInput;
}>;

export type ConvertToSpotifyPlaylistMutation = {
  __typename?: "Mutation";
  convertToSpotifyPlaylist: boolean;
};

export type ConvertToYoutubePlaylistMutationVariables = Types.Exact<{
  listJSON: Array<Types.PlaylistJsonInput> | Types.PlaylistJsonInput;
}>;

export type ConvertToYoutubePlaylistMutation = {
  __typename?: "Mutation";
  convertToYoutubePlaylist: boolean;
};

export type UpdateUserMutationVariables = Types.Exact<{
  updateUserInput: Types.UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: boolean;
};

export type SaveStatisticMutationVariables = Types.Exact<{
  saveStatisticInput: Types.SaveStatisticInput;
}>;

export type SaveStatisticMutation = {
  __typename?: "Mutation";
  saveStatistic: boolean;
};

export type UpdateStatisticMutationVariables = Types.Exact<{
  updateStatisticInput: Types.UpdateStatisticInput;
}>;

export type UpdateStatisticMutation = {
  __typename?: "Mutation";
  updateStatistic: {
    __typename?: "Statistic";
    user: { __typename?: "User"; id: string; name: string };
  };
};

export type RemoveStatisticMutationVariables = Types.Exact<{
  userId: Types.Scalars["ID"]["input"];
}>;

export type RemoveStatisticMutation = {
  __typename?: "Mutation";
  removeStatistic: { __typename?: "Statistic"; userId: string };
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
    listJson: Array<{
      __typename?: "PlaylistJSON";
      title?: string | null;
      artist?: string | null;
      album?: string | null;
      thumbnail?: string | null;
    }>;
    user: { __typename?: "User"; id: string; name: string };
  };
};

export type GetPlaylistsPageQueryVariables = Types.Exact<{
  limit: Types.Scalars["Int"]["input"];
  orderBy: Types.Scalars["String"]["input"];
  page: Types.Scalars["Int"]["input"];
  includeListJson: Types.Scalars["Boolean"]["input"];
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
      listJson?: Array<{
        __typename?: "PlaylistJSON";
        title?: string | null;
        artist?: string | null;
        album?: string | null;
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
    albumRankJson: string;
    artistRankJson: string;
    genreRankJson: string;
    updatedAt: string;
    user: { __typename?: "User"; id: string; name: string };
  };
};
