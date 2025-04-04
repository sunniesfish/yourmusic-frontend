import Logo from "@/components/logo";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-4 bg-background p-8 rounded-lg shadow-sm border">
        <Link href="/">
          <Logo />
        </Link>
        {children}
      </div>
    </div>
  );
}
