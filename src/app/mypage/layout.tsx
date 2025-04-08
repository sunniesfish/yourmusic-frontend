import Navbar from "@/components/nav-bar";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-2xl px-4 py-8">{children}</main>
    </>
  );
}
