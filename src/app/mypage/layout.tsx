import Navbar from "@/components/nav-bar";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen frutiger-aero-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
