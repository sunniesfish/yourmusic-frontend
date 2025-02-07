import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import Image from "next/image";

interface Song {
  title?: string | null;
  artist?: string | null;
  album?: string | null;
  thumbnail?: string | null;
}

interface SongTableProps {
  songs: Song[];
}

export function SongTable({ songs }: SongTableProps) {
  return (
    <div className="rounded-md border">
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
          {songs.map((song, index) => (
            <TableRow key={`${song.title}-${index}`}>
              <TableCell>
                <div className="relative h-10 w-10">
                  <Image
                    src={song.thumbnail || "/placeholder.svg"}
                    alt={song.title || ""}
                    fill
                    className="rounded object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell className="hidden md:table-cell">
                {song.album}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search song</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
