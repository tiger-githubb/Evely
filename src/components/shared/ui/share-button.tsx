"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  organizationName: string;
}

export function ShareButton({ organizationName }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = {
      title: organizationName,
      text: `Découvrez ${organizationName} sur YALA Events.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.url);
        alert("Lien copié dans le presse-papiers !");
      }
    } catch {
      alert("Échec du partage. Veuillez réessayer.");
    }
  };

  return (
    <Button variant="ghost" size="lg" onClick={handleShare}>
      <Share2 className="h-4 w-4 mr-2" />
      Partager
    </Button>
  );
}
