import { GET_USER } from "@/graphql/queries/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { client } from "./apollo-client";
import { GetUserQuery } from "@/graphql/types/generated";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
