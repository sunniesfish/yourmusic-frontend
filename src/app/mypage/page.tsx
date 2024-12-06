"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Edit2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../styles/frutiger-aero.css";
import ChangePasswordModal from "./changepwd-modal";
import { useAuth } from "@/hooks/auth-hooks";
import { useAuthStore } from "@/store/auth-store";
import { redirect } from "next/navigation";

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

  const handleNicknameEdit = () => {
    if (isEditingNickname) {
      // Save the new nickname
      if (user) {
        updateUser({ ...user, name: newNickname });
      }
    }
    setIsEditingNickname(!isEditingNickname);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  return (
    <>
      <div className="frutiger-aero-card p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={user?.profileImg ?? "/placeholder.svg?height=200&width=200"}
            alt={user?.name ?? ""}
            width={200}
            height={200}
            className="rounded-full mb-4"
          />
          <div className="flex items-center">
            {isEditingNickname ? (
              <Input
                value={newNickname}
                onChange={handleNicknameChange}
                className="frutiger-aero-input mr-2"
              />
            ) : (
              <h2 className="text-2xl font-bold text-blue-900 mr-2">
                {user?.name ?? ""}
              </h2>
            )}
            <Button
              onClick={handleNicknameEdit}
              variant="ghost"
              size="sm"
              className="text-blue-900 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              User ID
            </label>
            <Input
              value={user?.id ?? ""}
              disabled
              className="frutiger-aero-input bg-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Password
            </label>
            <div className="flex items-center">
              <Input
                value="••••"
                disabled
                className="frutiger-aero-input bg-opacity-50 mr-2"
              />
              <Button
                onClick={() => setIsPasswordModalOpen(true)}
                variant="outline"
                size="sm"
                className="frutiger-aero-button-secondary"
              >
                <Key className="h-4 w-4 mr-2" />
                Change
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
