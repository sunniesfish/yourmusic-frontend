import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openInNewTab(url: string) {
  console.log("openInNewTab called", url);
  try {
    new URL(url);
  } catch {
    toast({
      title: "Error",
      description: "Invalid URL provided",
      variant: "destructive",
    });
    return;
  }

  const newWindow = window.open(
    url,
    "_blank",
    [
      "noopener",
      "noreferrer",
      "width=500",
      "height=600",
      "left=" + (window.screenX + (window.outerWidth - 500) / 2),
      "top=" + (window.screenY + (window.outerHeight - 600) / 2),
    ].join(",")
  );

  // 팝업 차단 확인
  if (!newWindow) {
    toast({
      title: "팝업이 차단됨",
      description: "브라우저 설정에서 팝업을 허용해주세요",
      variant: "destructive",
    });
    // 대체 방법 제공
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }
}
