import { GET_USER } from "@/graphql/queries/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { client } from "./apollo-client";
import { GetUserQuery } from "@/graphql/types/generated";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUser() {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const { data: userData } = await client.query<GetUserQuery>({
    query: GET_USER,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: {
      id: user?.id,
    },
  });
  return userData?.user;
}
