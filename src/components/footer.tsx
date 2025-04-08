export default function Footer() {
  return (
    <footer className="bg-background text-foreground container mx-auto px-4 py-8">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Playlist Manager. All rights reserved.
      </p>
      <a href="https://www.flaticon.com/kr/free-icons/" title="사용자 아이콘">
        Created by Md Tanvirul Haque - Flaticon
      </a>
    </footer>
  );
}
