"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/theme-frutiger-aero.css";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/auth-hooks";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { getUser } = useAuth();
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    (async () => {
      const userData = await getUser();
      setUser(userData?.user ?? null);
    })();
  }, []);
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex gap-6">
              <Link
                href="/get-playlist"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Get Playlist
              </Link>
              <Link
                href="/my-playlists"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                My Playlists
              </Link>
            </div>
          </div>

          {/* User menu */}
          <div className="relative">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                <Image
                  src={user.profileImg || "/placeholder.svg"}
                  alt=""
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="hidden md:inline">{user.name}</span>
              </Button>
            ) : (
              <Link href="/auth/sign-in">
                <Button size="sm">Sign in</Button>
              </Link>
            )}

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md border bg-background shadow-lg">
                <div className="p-1">
                  <Link
                    href="/mypage"
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    MyPage
                  </Link>
                  <button
                    onClick={() => {
                      /* logout logic */
                    }}
                    className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="border-t py-2 md:hidden">
            <div className="space-y-1">
              <Link
                href="/get-playlist"
                className="block px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
              >
                Get Playlist
              </Link>
              <Link
                href="/my-playlists"
                className="block px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
              >
                My Playlists
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
