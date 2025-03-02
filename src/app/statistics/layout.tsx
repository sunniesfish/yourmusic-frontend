import Navbar from "@/components/nav-bar";

export default function StatisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
