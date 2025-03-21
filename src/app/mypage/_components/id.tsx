import { useAuthStore } from "@/store/auth-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Id() {
  const id = useAuthStore((state) => state.user?.id);
  return (
    <div className="space-y-2">
      <Label>User ID</Label>
      <Input value={id ?? ""} disabled />
    </div>
  );
}
