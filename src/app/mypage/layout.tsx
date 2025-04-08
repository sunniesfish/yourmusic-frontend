import Navbar from "@/components/nav-bar";
import ApolloProvider from "@/providers/apollo-provider";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ApolloProvider>
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </ApolloProvider>
    </>
  );
}
