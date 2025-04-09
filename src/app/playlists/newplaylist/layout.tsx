import ApolloProvider from "@/providers/apollo-provider";

export default function NewPlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <ApolloProvider>{children}</ApolloProvider>
    </main>
  );
}
