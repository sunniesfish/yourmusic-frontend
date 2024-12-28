interface RankItem {
  name: string;
  count: number;
  rank?: number;
}

export interface TopRanks {
  artistRank: RankItem[];
  albumRank: RankItem[];
  titleRank: RankItem[];
}

interface PlaylistItem {
  title?: string | null;
  artist?: string | null;
  album?: string | null;
}

interface Playlist {
  listJson?: Array<PlaylistItem> | null;
}

function getTopRanks(map: Map<string, number>, limit: number = 3): RankItem[] {
  const sortedItems = Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);

  let currentRank = 1;
  let currentCount = -1;

  return sortedItems.map(([name, count]) => {
    if (count !== currentCount) {
      currentRank = currentCount === -1 ? 1 : currentRank + 1;
      currentCount = count;
    }
    return { name, count, rank: currentRank };
  });
}

export function calculateTopRanks(playlists: Array<Playlist>): TopRanks {
  const artistMap = new Map<string, number>();
  const albumMap = new Map<string, number>();
  const titleMap = new Map<string, number>();

  playlists.forEach((playlist) => {
    playlist.listJson?.forEach((item) => {
      if (item.artist) {
        artistMap.set(item.artist, (artistMap.get(item.artist) || 0) + 1);
      }
      if (item.album) {
        albumMap.set(item.album, (albumMap.get(item.album) || 0) + 1);
      }
      if (item.title) {
        titleMap.set(item.title, (titleMap.get(item.title) || 0) + 1);
      }
    });
  });

  return {
    artistRank: getTopRanks(artistMap),
    albumRank: getTopRanks(albumMap),
    titleRank: getTopRanks(titleMap),
  };
}
