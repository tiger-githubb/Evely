"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInModal } from "@/components/shared/auth/sign-in-modal";
import { useSession } from "next-auth/react";
import {
  followOrganization,
  unfollowOrganization,
} from "@/server/services/followers.service";
import { toast } from "sonner";
import { CustomButton } from "@/components/ui/custom/custom-button";
import { Bell } from "lucide-react";

interface FollowButtonProps {
  organizationId: string;
  isFollowing?: boolean;
}

export function FollowButton({
  organizationId,
  isFollowing = false,
}: FollowButtonProps) {
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
    } catch (error) {
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
