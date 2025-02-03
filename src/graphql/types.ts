export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type ChangePasswordInput = {
  id: Scalars["ID"]["input"];
  password: Scalars["String"]["input"];
};

export type ConvertedPlaylist = {
  __typename?: "ConvertedPlaylist";
  message: Scalars["String"]["output"];
  playlistId?: Maybe<Scalars["String"]["output"]>;
  playlistName?: Maybe<Scalars["String"]["output"]>;
  playlistUrl?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type MutateStatisticInput = {
  albumRankJson: StatisticRankInput;
  artistRankJson: StatisticRankInput;
  titleRankJson: StatisticRankInput;
  userId: Scalars["ID"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: User;
  checkId: Scalars["Boolean"]["output"];
  checkPassword: Scalars["Boolean"]["output"];
  convertToSpotifyPlaylist: ConvertedPlaylist;
  convertToYoutubePlaylist: ConvertedPlaylist;
  readPlaylist: Array<PlaylistJson>;
  removePlaylist: Playlist;
  removeStatistic: Statistic;
  savePlaylist: Scalars["Boolean"]["output"];
  saveStatistic: Scalars["Boolean"]["output"];
  signIn: SignInResponse;
  signOut: Scalars["Boolean"]["output"];
  signUp: Scalars["Boolean"]["output"];
  updateStatistic: Statistic;
  updateUser: Scalars["Boolean"]["output"];
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationCheckIdArgs = {
  id: Scalars["String"]["input"];
};

export type MutationCheckPasswordArgs = {
  password: Scalars["String"]["input"];
};

export type MutationConvertToSpotifyPlaylistArgs = {
  listJSON: Array<PlaylistJsonInput>;
};

export type MutationConvertToYoutubePlaylistArgs = {
  listJSON: Array<PlaylistJsonInput>;
};

export type MutationReadPlaylistArgs = {
  link: Scalars["String"]["input"];
};

export type MutationRemovePlaylistArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationRemoveStatisticArgs = {
  userId: Scalars["ID"]["input"];
};

export type MutationSavePlaylistArgs = {
  savePlaylistInput: SavePlaylistInput;
};

export type MutationSaveStatisticArgs = {
  saveStatisticInput: MutateStatisticInput;
};

export type MutationSignInArgs = {
  signInInput: SignInInput;
};

export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};

export type MutationUpdateStatisticArgs = {
  updateStatisticInput: MutateStatisticInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Playlist = {
  __typename?: "Playlist";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  listJson?: Maybe<Array<PlaylistJson>>;
  name: Scalars["String"]["output"];
};

export type PlaylistJson = {
  __typename?: "PlaylistJSON";
  album?: Maybe<Scalars["String"]["output"]>;
  artist?: Maybe<Scalars["String"]["output"]>;
  thumbnail?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type PlaylistJsonInput = {
  album?: InputMaybe<Scalars["String"]["input"]>;
  artist?: InputMaybe<Scalars["String"]["input"]>;
  thumbnail?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type PlaylistsResponse = {
  __typename?: "PlaylistsResponse";
  playlists: Array<Playlist>;
  totalPages: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  playlist: Playlist;
  playlistsPage: PlaylistsResponse;
  statistic: Statistic;
  user: User;
};

export type QueryPlaylistArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryPlaylistsPageArgs = {
  limit: Scalars["Int"]["input"];
  orderBy: Scalars["String"]["input"];
  page: Scalars["Int"]["input"];
};

export type QueryStatisticArgs = {
  userId: Scalars["ID"]["input"];
};

export type SavePlaylistInput = {
  listJson: Array<PlaylistJsonInput>;
  name: Scalars["String"]["input"];
};

export type SignInInput = {
  id: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignInResponse = {
  __typename?: "SignInResponse";
  accessToken: Scalars["String"]["output"];
  user: User;
};

export type SignUpInput = {
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  profileImg?: InputMaybe<Scalars["String"]["input"]>;
};

export type Statistic = {
  __typename?: "Statistic";
  albumRankJson: StatisticRank;
  artistRankJson: StatisticRank;
  titleRankJson: StatisticRank;
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["ID"]["output"];
};

export type StatisticRank = {
  __typename?: "StatisticRank";
  first: Scalars["String"]["output"];
  second: Scalars["String"]["output"];
  third: Scalars["String"]["output"];
};

export type StatisticRankInput = {
  first: Scalars["String"]["input"];
  second: Scalars["String"]["input"];
  third: Scalars["String"]["input"];
};

export type UpdateUserInput = {
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  profileImg?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  profileImg?: Maybe<Scalars["String"]["output"]>;
};
