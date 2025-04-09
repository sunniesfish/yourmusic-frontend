"use client";

import { useEffect, useState } from "react";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
