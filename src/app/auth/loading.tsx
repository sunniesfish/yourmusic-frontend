import React from "react";
import FrutigerLoader from "@/components/loader";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return <FrutigerLoader message={message} />;
}
