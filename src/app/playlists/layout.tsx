import Navbar from "@/components/nav-bar";
import "@/styles/theme-frutiger-aero.css";

interface PlaylistsLayoutProps {
  children: React.ReactNode;
}

export default function PlaylistsLayout({ children }: PlaylistsLayoutProps) {
  return (
    <div className="min-h-screen frutiger-aero-bg">
      <Navbar
        isLoggedIn={true}
        username="John Doe"
        profileImage="/placeholder.svg?height=32&width=32"
      />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
