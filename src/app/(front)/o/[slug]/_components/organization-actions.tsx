"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { followOrganization, unfollowOrganization } from "@/server/services/followers.service";
import { Organization } from "@/types/api/organization.type";
import { Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface OrganizationActionsProps {
  organization: Organization;
  isFollowing?: boolean;
}

export function OrganizationActions({ organization, isFollowing = false }: OrganizationActionsProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleFollowToggle = async () => {
    if (!session) {
      router.push(routes.auth.signIn);
      return;
    }

    setIsLoading(true);
    try {
      if (following) {
        await unfollowOrganization(organization.id);
        toast.success("Vous ne suivez plus cette organisation");
      } else {
        await followOrganization(organization.id);
        toast.success("Vous suivez maintenant cette organisation");
      }
      setFollowing(!following);
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: organization.name,
      text: `Découvrez ${organization.name} sur YALA Events`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Lien copié dans le presse-papier");
      }
    } catch (err) {
      console.error(err);
      toast.error("Le partage a échoué");
    }
  };

  return (
    <div className="flex items-center gap-3 mb-4 sm:ml-auto">
      <Button
        size="lg"
        className="flex-1 sm:flex-none"
        onClick={handleFollowToggle}
        disabled={isLoading}
        variant={following ? "outline" : "default"}
      >
        {following ? "Ne plus suivre" : "Suivre"}
      </Button>
      <Button variant="outline" size="lg" className="flex-1 sm:flex-none" onClick={handleShare}>
        <Share2 className="h-4 w-4 mr-2" />
        Partager
      </Button>
    </div>
  );
}
