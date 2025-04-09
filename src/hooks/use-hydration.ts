import { useEffect, useState } from "react";

export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    console.log("hydration");
    setIsHydrated(true);
  }, []);
  return isHydrated;
}
