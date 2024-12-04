import "../../styles/theme-frutiger-aero.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center frutiger-aero-bg p-4">
      <div className="frutiger-aero-card p-8 rounded-xl w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
