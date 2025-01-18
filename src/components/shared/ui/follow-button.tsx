"use client";

import { SignInModal } from "@/components/shared/auth/sign-in-modal";
import { CustomButton } from "@/components/ui/custom/custom-button";
import { followOrganization, unfollowOrganization } from "@/server/services/followers.service";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("FollowButton"); // Load translations for FollowButton

  const handleFollowToggle = async () => {
    if (!session) {
      setShowSignInModal(true);
      return;
    }

    setIsLoading(true);

    try {
      if (following) {
        await unfollowOrganization(Number(organizationId));
        toast.success(t("unfollowSuccess")); // Toast for unfollow success
      } else {
        await followOrganization(Number(organizationId));
        toast.success(t("followSuccess")); // Toast for follow success
      }

      setFollowing(!following);
    } catch {
      toast.error(t("errorMessage")); // Toast for errors
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
        className="rounded-full"
      >
        {following ? (
          <>
            <Bell className="w-4 h-4 mr-2" />
            {t("unfollowButton")}
          </>
        ) : (
          t("followButton")
        )}
      </CustomButton>
      <SignInModal isOpen={showSignInModal} onOpenChange={setShowSignInModal} />
    </>
  );
}
