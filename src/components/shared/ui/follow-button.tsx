"use client";

import { SignInModal } from "@/components/shared/auth/sign-in-modal";
import { CustomButton } from "@/components/ui/custom/custom-button";
import { followOrganization, unfollowOrganization } from "@/server/services/followers.service";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface FollowButtonProps {
  organizationId: string;
  isFollowing?: boolean;
}

export function FollowButton({ organizationId, isFollowing = false }: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { data: session } = useSession();

  const handleFollowToggle = async () => {
    if (!session) {
      setShowSignInModal(true);
      return;
    }

    setIsLoading(true);

    try {
      if (following) {
        await unfollowOrganization(Number(organizationId));
        toast.success("Vous ne suivez plus l'organisation.");
      } else {
        await followOrganization(Number(organizationId));
        toast.success("Vous suivez désormais l'organisation !");
      }

      setFollowing(!following);
    } catch {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomButton
        onClick={handleFollowToggle}
        disabled={isLoading}
        variant={following ? "secondary" : "black"}
        //round button

        className="rounded-full"
      >
        {following ? (
          <>
            <Bell className="w-4 h-4 mr-2" />
            Ne plus suivre
          </>
        ) : (
          "Suivre"
        )}
      </CustomButton>
      <SignInModal isOpen={showSignInModal} onOpenChange={setShowSignInModal} />
    </>
  );
}
