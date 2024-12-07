"use client";

import React, { useState } from "react";
import { Edit2, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlaylist } from "@/hooks/playlist-hooks";
import { useAuthStore } from "@/store/auth-store";
import { SongTable } from "../components";
import { Playlist, PlaylistJson } from "@/graphql/types";

export default function NewPlaylistPage() {
  const { token, user } = useAuthStore();
  const { savePlaylist, readPlaylist } = usePlaylist();

  const [playlistTitle, setPlaylistTitle] = useState("New Playlist");
  const [playlistData, setPlaylistData] = useState<PlaylistJson[] | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [playlistLink, setPlaylistLink] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const playlistData = await readPlaylist(playlistLink);
      if (playlistData) {
        setPlaylistData(playlistData);
      }
    } catch (error) {
      console.error("Error getting playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frutiger-aero-card p-6 rounded-lg shadow-lg">
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
          <Input
            id="playlist-link"
            type="url"
            placeholder="Enter playlist link here"
            value={playlistLink}
            onChange={handleLinkChange}
            className="w-full frutiger-aero-input"
          />
        </div>
        <Button
          onClick={handleGetPlaylist}
          className="w-full md:w-auto frutiger-aero-button"
        >
          Get Playlist <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      {loading && <Loader2 className="animate-spin h-4 w-4" />}
      {playlistData && <SongTable songs={playlistData} />}
    </div>
  );
}
