"use client";

import React from "react";
import {
  Music,
  Search,
  Download,
  Youtube,
  AirplayIcon as Spotify,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
}

const sampleSongs: Song[] = [
  {
    id: "1",
    title: "Song 1",
    artist: "Artist 1",
    album: "Album 1",
    coverArt: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    title: "Song 2",
    artist: "Artist 2",
    album: "Album 2",
    coverArt: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    title: "Song 3",
    artist: "Artist 3",
    album: "Album 3",
    coverArt: "/placeholder.svg?height=40&width=40",
  },
  // Add more sample songs as needed
];

export default function PlaylistPage() {
  const playlistTitle = "My Awesome Playlist";

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">{playlistTitle}</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <Button className="frutiger-aero-button">
          <Youtube className="mr-2 h-4 w-4" /> Convert to YouTube
        </Button>
        <Button className="frutiger-aero-button">
          <Spotify className="mr-2 h-4 w-4" /> Convert to Spotify
        </Button>
        <Button className="frutiger-aero-button">
          <Download className="mr-2 h-4 w-4" /> Download JSON
        </Button>
      </div>
      <div className="frutiger-aero-card overflow-hidden rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead className="hidden md:table-cell">Album</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleSongs.map((song) => (
              <TableRow key={song.id}>
                <TableCell>
                  <Image
                    src={song.coverArt}
                    alt={song.title}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {song.album}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
