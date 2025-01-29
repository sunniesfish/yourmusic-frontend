import { Loader2 } from "lucide-react";

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center gap-4 p-4">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </div>
  );
}
