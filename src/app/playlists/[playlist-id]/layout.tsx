import ApolloProvider from "@/providers/apollo-provider";

export default function PlaylistDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 w-full">{children}</div>
    </div>
  );
}
