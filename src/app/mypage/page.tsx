"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import ChangePasswordModal from "./_components/changepwd-modal";
import { useHydration } from "@/hooks/use-hydration";
import Name from "./_components/name";
import Id from "./_components/id";
import ProfileImg from "./_components/profileImg";

export default function MyPage() {
  const { isLoggedIn } = useAuth();
  const isHydrated = useHydration();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && isHydrated) {
      redirect("/auth/sign-in");
    }
  }, [isLoggedIn, isHydrated]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center space-y-6">
          <ProfileImg />
          <div className="space-y-4 text-center">
            <Name />
            <Id />
            <Button
              variant="outline"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
}
