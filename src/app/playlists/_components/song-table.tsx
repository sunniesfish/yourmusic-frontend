import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SongTableProps } from "@/types/playlist";

import Image from "next/image";
import SearchSongBtn from "./search-song_btn";

export const SongTable = ({ songs }: SongTableProps) => {
  return (
    <section className="rounded-md border">
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
                  {song.thumbnail ? (
                    <Image
                      src={song.thumbnail}
                      alt={song.title || ""}
                      fill
                      className="rounded object-cover"
                      loading="lazy"
                      placeholder="blur"
                    />
                  ) : (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="4" fill="#5C7285" />
                      <g transform="translate(10,10) scale(0.8333)">
                        <path
                          d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"
                          fill="#FFFFFF"
                        />
                      </g>
                    </svg>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell className="hidden md:table-cell">
                {song.album}
              </TableCell>
              <TableCell>
                <SearchSongBtn
                  songTitle={song.title || ""}
                  songArtist={song.artist || ""}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
