function getTopRanks(map, limit = 3) {
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

export function calculateTopRanks(playlists) {
  const artistMap = new Map();
  const albumMap = new Map();
  const titleMap = new Map();

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

self.onmessage = (event) => {
  const { playlists } = event.data;
  const result = calculateTopRanks(playlists);
  self.postMessage(result);
};
