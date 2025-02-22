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
import { useUpdateUserMutation } from "@/graphql/hooks";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MyPage() {
  const { isLoggedIn, token } = useAuth();
  const { user } = useAuthStore();
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(user?.name ?? "");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [updateUserMutation, { loading }] = useUpdateUserMutation();
  const { toast } = useToast();
  useEffect(() => {
    if (!isLoggedIn()) {
      redirect("/auth/sign-in");
    }
  }, [isLoggedIn]);

  const handleNicknameEdit = async () => {
    if (isEditingNickname && user) {
      const result = await updateUserMutation({
        variables: { updateUserInput: { ...user, name: newNickname } },
        context: { headers: { Authorization: `Bearer ${token}` } },
        update: (cache) => {
          cache.evict({ fieldName: "user" });
          cache.gc();
        },
      });
      if (!result) {
        toast({
          title: "Failed to update nickname",
          description: "Please try again",
        });
      } else {
        toast({
          title: "Nickname updated successfully",
        });
      }
    }
    setIsEditingNickname(!isEditingNickname);
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative h-32 w-32">
            {user?.profileImg ? (
              <Image
                src={user?.profileImg}
                alt=""
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <svg
                width="128"
                height="128"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="64"
                  cy="40"
                  r="24"
                  stroke="black"
                  stroke-width="8"
                />
                <path
                  d="M16 112c0-24 24-36 48-36s48 12 48 36"
                  stroke="black"
                  stroke-width="8"
                  stroke-linecap="round"
                />
              </svg>
            )}
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
                disabled={loading}
              >
                {isEditingNickname ? "Save" : "Edit"}{" "}
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
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
