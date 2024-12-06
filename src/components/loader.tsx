import { Loader2 } from "lucide-react";

export default function FrutigerLoader({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="min-h-screen frutiger-aero-bg flex items-center justify-center">
      <div className="frutiger-aero-card p-8 rounded-lg shadow-lg text-center">
        <div className="frutiger-aero-loader mb-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
        <p className="text-xl font-semibold text-blue-900">{message}</p>
      </div>
    </div>
  );
}
