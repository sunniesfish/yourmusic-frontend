"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { useHydration } from "@/hooks/use-hydration";
import Name from "./_components/name";
import Id from "./_components/id";
import dynamic from "next/dynamic";
import ProfileImg from "./_components/profileImg";

const ChangePasswordModal = dynamic(
  () => import("./_components/changepwd-modal").then((mod) => mod.default),
  {
    ssr: false,
  }
);

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
    <>
      <section className="rounded-lg border bg-card p-8 shadow-sm">
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
      </section>
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </>
  );
}
