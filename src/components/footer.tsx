export default function Footer() {
  return (
    <footer className="bg-background bg-black text-foreground">
      <div className="container mx-auto px-4 py-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} YourMusic. All rights reserved.
        </p>
        <a
          href="https://www.flaticon.com/kr/free-icons/"
          title="사용자 아이콘"
          className="text-muted-foreground text-xs"
        >
          Created by Md Tanvirul Haque - Flaticon
        </a>
      </div>
    </footer>
  );
}
