import Navbar from "@/components/nav-bar";
import ApolloProvider from "@/providers/apollo-provider";

interface PlaylistsLayoutProps {
  children: React.ReactNode;
}

export default async function PlaylistsLayout({
  children,
}: PlaylistsLayoutProps) {
  return (
    <>
      <ApolloProvider>
        <Navbar />
      </ApolloProvider>
      {children}
    </>
  );
}
