import ApolloProvider from "@/providers/apollo-provider";

export default function NewPlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ApolloProvider>{children}</ApolloProvider>
    </div>
  );
}
