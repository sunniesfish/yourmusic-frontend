import Navbar from "@/components/nav-bar";

interface PlaylistsLayoutProps {
  children: React.ReactNode;
}

export default async function PlaylistsLayout({
  children,
}: PlaylistsLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
