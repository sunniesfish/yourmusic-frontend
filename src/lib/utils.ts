import { PlaylistJson } from "@/graphql/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePlaylistJSONArray(json: string): PlaylistJson[] {
  return JSON.parse(json);
}
