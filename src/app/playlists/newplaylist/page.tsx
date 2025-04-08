"use client";

import React, { useState } from "react";
import { Edit2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlaylist } from "@/hooks/use-playlist";
import { useAuthStore } from "@/store/auth-store";
import { SongTable } from "../_components/song-table";
import { PlaylistJson } from "@/graphql/types";
import {
  ConvertToSpotifyPlaylistButton,
  ConvertToYoutubePlaylistButton,
  GetListButton,
  SavePlaylistButton,
} from "../_components/buttons";
import { useSanitizedData } from "@/hooks/use-sanitizedata";

export default function NewPlaylistPage() {
  const { token, user } = useAuthStore();
  const { readPlaylist } = usePlaylist();

  const [playlistTitle, setPlaylistTitle] = useState("New Playlist");
  const [playlistData, setPlaylistData] = useState<PlaylistJson[] | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [playlistLink, setPlaylistLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sanitizedPlaylistData = useSanitizedData(playlistData);

  const handleTitleEdit = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistLink(e.target.value);
  };

  const handleGetPlaylist = async () => {
    try {
      setIsLoading(true);
      const playlistData = await readPlaylist(playlistLink);
      if (playlistData) {
        setPlaylistData(playlistData);
      }
    } catch (error) {
      console.error("Error getting playlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="relative inline-flex items-center gap-4 pb-2">
        {user && (
          <Button
            onClick={handleTitleEdit}
            size="sm"
            variant="ghost"
            className="bg-white text-black hover:bg-white/90"
          >
            <Edit2 className="h-3 w-3" />
          </Button>
        )}

        {user && isEditingTitle ? (
          <Input
            value={playlistTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="text-2xl font-semibold min-w-[200px] max-w-[300px] md:min-w-[300px] md:max-w-[600px] xl:min-w-[400px] xl:max-w-[800px] text-center border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none focus:shadow-none [&:not(:placeholder-shown)]:text-2xl"
            style={{ fontSize: "1.5rem" }}
            autoFocus
          />
        ) : (
          <h1 className="text-2xl font-semibold min-w-[200px] max-w-[300px] md:min-w-[300px] md:max-w-[600px] xl:min-w-[400px] xl:max-w-[800px] text-center">
            {playlistTitle}
          </h1>
        )}
        <div className="absolute bottom-0 left-[-4px] right-[-4px] h-[1px] bg-black" />
      </header>
      <section className="space-y-4">
        <div className="flex gap-2 items-center mt-8">
          <Input
            id="playlist-link"
            type="url"
            placeholder="Enter playlist link here"
            value={playlistLink}
            onChange={handleLinkChange}
            className="flex-1"
          />
          <GetListButton
            isLoading={isLoading}
            handleClick={handleGetPlaylist}
          />
        </div>
      </section>
      {isLoading && <Loader2 className="animate-spin h-4 w-4 " />}
      {sanitizedPlaylistData && (
        <>
          <section className="flex items-center justify-center mb-2 mt-6">
            <div className="flex flex-col md:flex gap-4 w-full">
              <ConvertToSpotifyPlaylistButton
                playlistData={sanitizedPlaylistData}
                token={token}
              />
              <ConvertToYoutubePlaylistButton
                playlistData={sanitizedPlaylistData}
                token={token}
              />
            </div>
          </section>
          <section className="flex flex-col mb-6 mt-6">
            <div className="flex justify-end mb-2">
              {token && (
                <SavePlaylistButton
                  playlistData={sanitizedPlaylistData}
                  playlistTitle={playlistTitle}
                  token={token}
                />
              )}
            </div>
            <SongTable songs={sanitizedPlaylistData} />
          </section>
        </>
      )}
    </main>
  );
}
