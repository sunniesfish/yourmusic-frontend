import Navbar from "@/components/nav-bar";

interface PlaylistsLayoutProps {
  children: React.ReactNode;
}

export default function PlaylistsLayout({ children }: PlaylistsLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
