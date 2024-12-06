"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/theme-frutiger-aero.css";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/auth-hooks";
import { User } from "@/graphql/types/generated";
import { useAuthStore } from "@/store/auth-store";

interface NavbarProps {
  isLoggedIn: boolean;
  username?: string;
  profileImage?: string;
}

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { getUser } = useAuth();
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    (async () => {
      const userData = await getUser();
      setUser(userData ?? null);
    })();
  }, []);
  return (
    <nav className="frutiger-aero-navbar p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link
              href="/get-playlist"
              className="text-blue-900 hover:text-blue-700 transition-colors"
            >
              Get Playlist
            </Link>
            <Link
              href="/my-playlists"
              className="text-blue-900 hover:text-blue-700 transition-colors"
            >
              My Playlists
            </Link>
          </div>
          <button
            className="md:hidden text-blue-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="relative">
          {user ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <Image
                  src={user.profileImg || "/placeholder.svg"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-blue-900 hidden md:inline">
                  {user.name}
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 frutiger-aero-dropdown rounded-md shadow-lg py-1 z-10">
                  <Link
                    href="/my-page"
                    className="block px-4 py-2 text-sm text-blue-900 hover:bg-blue-100 frutiger-aero-dropdown-item"
                  >
                    MyPage
                  </Link>
                  <button
                    onClick={() => {
                      // 로그아웃 로직을 여기에 구현하세요
                      console.log("Logging out...");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-blue-900 hover:bg-blue-100 frutiger-aero-dropdown-item"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="frutiger-aero-button px-4 py-2 rounded-md text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 frutiger-aero-dropdown rounded-md shadow-lg py-1">
          <Link
            href="/get-playlist"
            className="block px-4 py-2 text-sm text-blue-900 hover:bg-blue-100 frutiger-aero-dropdown-item"
          >
            Get Playlist
          </Link>
          <Link
            href="/my-playlists"
            className="block px-4 py-2 text-sm text-blue-900 hover:bg-blue-100 frutiger-aero-dropdown-item"
          >
            My Playlists
          </Link>
        </div>
      )}
    </nav>
  );
}
