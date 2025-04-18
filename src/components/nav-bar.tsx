"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MenuItem {
  href: string;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  { href: "/playlists/newplaylist", label: "New Playlist" },
  { href: "/playlists", label: "My Playlists" },
  { href: "/statistics", label: "Statistics" },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/sign-in");
  };

  const renderMenuItem = ({ href, label }: MenuItem, isMobile = false) => {
    const isActive = pathname === href;
    const baseStyles = "relative text-sm font-medium transition-colors";
    const mobileStyles = "block w-full px-2 py-1.5 rounded-md";
    const desktopStyles = "px-1 py-1.5";

    return (
      <Link
        key={href}
        href={href}
        className={cn(
          baseStyles,
          isMobile ? mobileStyles : desktopStyles,
          "hover:text-primary/80",
          {
            "text-foreground/60": !isActive,
            "text-foreground": isActive,
          },
          "group"
        )}
      >
        {label}
        {!isMobile && (
          <span
            className={cn(
              "absolute inset-x-0 -bottom-[1px] h-[2px] bg-primary transition-all",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
            )}
          />
        )}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 border-b bg-background z-40">
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
              {MENU_ITEMS.map((item) => renderMenuItem(item))}
            </div>
          </div>

          {/* User menu */}
          <div className="relative">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                aria-expanded={isDropdownOpen}
              >
                {user.profileImg ? (
                  <Image
                    src={user.profileImg}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                    priority
                  />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                    <path
                      d="M4 20c0-4 4-6 8-6s8 2 8 6"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
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
                <div className="flex flex-col p-1">
                  <Link
                    href="/mypage"
                    className="rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    MyPage
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="rounded-sm px-2 py-1.5 text-sm text-left hover:bg-accent hover:text-accent-foreground"
                  >
                    Sign Out
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
              {MENU_ITEMS.map((item) => renderMenuItem(item, true))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
