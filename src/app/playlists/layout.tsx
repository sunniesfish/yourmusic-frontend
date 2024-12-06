import Navbar from "@/components/nav-bar";
import "@/styles/theme-frutiger-aero.css";

interface PlaylistsLayoutProps {
  children: React.ReactNode;
}

export default async function PlaylistsLayout({
  children,
}: PlaylistsLayoutProps) {
  return (
    <div className="min-h-screen frutiger-aero-bg">
      <Navbar />
      {children}
    </div>
  );
}
