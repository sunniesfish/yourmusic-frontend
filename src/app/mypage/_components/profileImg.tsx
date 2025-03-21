import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";

export default function ProfileImg() {
  const profileImg = useAuthStore((state) => state.user?.profileImg);

  return (
    <div className="relative h-32 w-32">
      {profileImg ? (
        <Image
          src={profileImg}
          alt=""
          fill
          className="rounded-full object-cover"
        />
      ) : (
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="64" cy="40" r="24" stroke="black" strokeWidth="8" />
          <path
            d="M16 112c0-24 24-36 48-36s48 12 48 36"
            stroke="black"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
