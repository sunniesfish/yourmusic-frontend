import Logo from "@/components/logo";
import ApolloProvider from "@/providers/apollo-provider";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <section className="w-full max-w-md space-y-4 bg-background p-8 rounded-lg shadow-sm border">
        <ApolloProvider>
          <Link href="/">
            <Logo />
          </Link>
          {children}
        </ApolloProvider>
      </section>
    </main>
  );
}
