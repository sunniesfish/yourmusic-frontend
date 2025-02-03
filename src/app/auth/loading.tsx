import React from "react";
import Loader from "@/components/loader";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return <Loader message={message} />;
}
