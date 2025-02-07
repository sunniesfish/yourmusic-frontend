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

export default function NewPlaylistPage() {
  const { token, user } = useAuthStore();
  const { readPlaylist } = usePlaylist();

  const [playlistTitle, setPlaylistTitle] = useState("New Playlist");
  const [playlistData, setPlaylistData] = useState<PlaylistJson[] | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [playlistLink, setPlaylistLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className=" p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        {user && isEditingTitle ? (
          <Input
            value={playlistTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="text-2xl font-bold text-blue-900 bg-transparent border-none focus:ring-0"
            autoFocus
          />
        ) : (
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
            {playlistTitle}
          </h1>
        )}
        {user && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleTitleEdit}
            className="text-blue-900 hover:text-blue-700"
          >
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit title</span>
          </Button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="playlist-link"
            className="block text-sm font-medium text-blue-900 mb-1"
          >
            Playlist Link
          </label>
          <div className="flex gap-2 items-center">
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
        </div>
      </div>
      {isLoading && <Loader2 className="animate-spin h-4 w-4 " />}
      {playlistData && (
        <>
          <div className="flex items-center justify-center mb-2 mt-6">
            <p className="text-md font-medium text-blue-900 mb-1 ">
              Convert To
            </p>
            <div className="flex items-center gap-2 ml-3 mr-3">
              <ConvertToSpotifyPlaylistButton playlistData={playlistData} />
              <p className="text-md font-medium text-blue-900 mb-1">or</p>
              <ConvertToYoutubePlaylistButton playlistData={playlistData} />
            </div>
            <p className="text-md font-medium text-blue-900 mb-1">Playlist</p>
          </div>
          <div className="flex flex-col mb-6 mt-6">
            <div className="flex justify-end mb-2">
              {token && (
                <SavePlaylistButton
                  playlistData={playlistData}
                  playlistTitle={playlistTitle}
                  token={token}
                />
              )}
            </div>
            <SongTable songs={playlistData} />
          </div>
        </>
      )}
    </div>
  );
}
