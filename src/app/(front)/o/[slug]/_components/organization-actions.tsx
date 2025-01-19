"use client";

import { SignInModal } from "@/components/shared/auth/sign-in-modal";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom/custom-button";
import { followOrganization, unfollowOrganization } from "@/server/services/followers.service";
import { Organization } from "@/types/api/organization.type";
import { Bell, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

interface OrganizationActionsProps {
  organization: Organization;
  isFollowing?: boolean;
}

export function OrganizationActions({ organization, isFollowing = false }: OrganizationActionsProps) {
  const t = useTranslations("organizationActions");
  const t2 = useTranslations("FollowButton");
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
        await unfollowOrganization(organization.id);
        toast.success(t("unfollowSuccess"));
      } else {
        await followOrganization(organization.id);
        toast.success(t("followSuccess"));
      }
      setFollowing(!following);
    } catch {
      toast.error(t("actionError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: organization.name,
      text: t("shareText", { name: organization.name }),
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(t("copySuccess"));
      }
    } catch {
      toast.error(t("shareError"));
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-4 sm:ml-auto align-self-center">
        <CustomButton
          onClick={handleFollowToggle}
          disabled={isLoading}
          variant={following ? "secondary" : "black"}
          className="rounded-full"
        >
          {following ? (
            <>
              <Bell className="w-4 h-4 mr-2" />
              {t2("unfollowButton")}
            </>
          ) : (
            t2("followButton")
          )}
        </CustomButton>
        <SignInModal isOpen={showSignInModal} onOpenChange={setShowSignInModal} />

        <Button size="lg" variant="ghost" className="flex-1 sm:flex-none text-[#fff]" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          {t("share")}
        </Button>
      </div>
      <SignInModal isOpen={showSignInModal} onOpenChange={setShowSignInModal} />
    </>
  );
}
