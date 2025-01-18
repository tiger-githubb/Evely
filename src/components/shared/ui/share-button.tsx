"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ShareButtonProps {
  organizationName: string;
}

export function ShareButton({ organizationName }: ShareButtonProps) {
  const t = useTranslations("ShareButton"); // Load translations for ShareButton

  const handleShare = async () => {
    const shareData = {
      title: organizationName,
      text: t("shareText", { organizationName }),
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.url);
        alert(t("copySuccess")); // Translated success alert
      }
    } catch {
      alert(t("shareError")); // Translated error alert
    }
  };

  return (
    <Button variant="ghost" size="lg" onClick={handleShare}>
      <Share2 className="h-4 w-4 mr-2" />
      {t("buttonText")}
    </Button>
  );
}
