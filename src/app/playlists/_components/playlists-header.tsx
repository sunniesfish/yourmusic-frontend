"use client";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Link, Plus } from "lucide-react";

export default function PlaylistsHeader({
  userName,
  sortType,
  handleSortChange,
}: {
  userName: string;
  sortType: string;
  handleSortChange: (value: string) => void;
}) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">
        {userName} &apos;s Playlists
      </h1>
      <div className="flex items-center gap-4">
        <Select
          value={sortType}
          onValueChange={(value) =>
            handleSortChange(value as "name" | "createdAt")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="createdAt">Sort by Date</SelectItem>
          </SelectContent>
        </Select>
        <Link href="/playlists/newplaylist">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Playlist
          </Button>
        </Link>
      </div>
    </header>
  );
}
