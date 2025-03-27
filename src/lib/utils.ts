import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openInNewTab(url: string): void {
  try {
    const urlObj = new URL(url);

    if (!["http:", "https:"].includes(urlObj.protocol)) {
      toast({
        title: "Invalid URL",
        description: "Not a safe web address",
        variant: "destructive",
      });
      return;
    }

    const popupFeatures = [
      "noopener",
      "noreferrer",
      "width=500",
      "height=600",
      `left=${window.screenX + (window.outerWidth - 500) / 2}`,
      `top=${window.screenY + (window.outerHeight - 600) / 2}`,
    ].join(",");

    const newWindow = window.open(url, "_blank", popupFeatures);

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      toast({
        title: "Popup blocked",
        description: "Please allow popups in your browser settings",
        variant: "destructive",
      });

      setTimeout(() => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 100);
    }
  } catch (error) {
    console.log(error);
    toast({
      title: "Error",
      description: "An error occurred while opening the URL",
      variant: "destructive",
    });
  }
}
