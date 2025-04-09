"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchSongBtn({
  songTitle,
  songArtist,
}: {
  songTitle: string;
  songArtist: string;
}) {
  const handleSearch = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${songTitle} ${songArtist}`,
      "_blank"
    );
  };
  return (
    <Button variant="ghost" size="sm" onClick={handleSearch}>
      <Search className="h-4 w-4" />
      <span className="sr-only">Search song</span>
    </Button>
  );
}
