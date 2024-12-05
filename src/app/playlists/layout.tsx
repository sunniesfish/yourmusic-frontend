import Navbar from "@/components/nav-bar";
import "@/styles/theme-frutiger-aero.css";
import { getUser } from "@/lib/utils";

interface PlaylistsLayoutProps {
  children: React.ReactNode;
}

export default async function PlaylistsLayout({
  children,
}: PlaylistsLayoutProps) {
  const user = await getUser();

  return (
    <div className="min-h-screen frutiger-aero-bg">
      <Navbar
        isLoggedIn={user?.id !== null}
        username={user?.name}
        profileImage={user?.profileImg ?? undefined}
      />
      {children}
    </div>
  );
}
