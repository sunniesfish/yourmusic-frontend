import Navbar from "@/components/nav-bar";
import ApolloProvider from "@/providers/apollo-provider";
export default function StatisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ApolloProvider>
        <Navbar />
        {children}
      </ApolloProvider>
    </>
  );
}
