export default function PlaylistDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 py-8 space-y-6">{children}</main>
  );
}
