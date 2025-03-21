import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link className="text-blue-500" href="/playlists/newplaylist">
        Go write a playlist
      </Link>
    </div>
  );
}
