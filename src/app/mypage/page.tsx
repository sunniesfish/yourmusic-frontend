"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";
import { redirect } from "next/navigation";
import ChangePasswordModal from "./changepwd-modal";

export default function MyPage() {
  const { updateUser, isLoggedIn } = useAuth();
  const { user } = useAuthStore();
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(user?.name ?? "");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      redirect("/auth/sign-in");
    }
  }, [isLoggedIn]);

  const handleNicknameEdit = async () => {
    if (isEditingNickname && user) {
      await updateUser({ ...user, name: newNickname });
    }
    setIsEditingNickname(!isEditingNickname);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative h-32 w-32">
            <Image
              src={user?.profileImg ?? "/placeholder.svg"}
              alt=""
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              {isEditingNickname ? (
                <Input
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  className="max-w-[200px]"
                />
              ) : (
                <h2 className="text-2xl font-semibold">{user?.name}</h2>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNicknameEdit}
                aria-label={
                  isEditingNickname ? "Save nickname" : "Edit nickname"
                }
              >
                {isEditingNickname ? "Save" : "Edit"}
              </Button>
            </div>

            <div className="space-y-2">
              <Label>User ID</Label>
              <Input value={user?.id ?? ""} disabled />
            </div>

            <Button
              variant="outline"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
