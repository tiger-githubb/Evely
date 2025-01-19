import { Button } from "@/components/ui/button";
import { Organization } from "@/types/api/organization.type";
import { getImageUrl } from "@/utils/image-utils";
import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { OrganizationActions } from "./organization-actions";

export async function OrganizationHeader({ organization }: { organization: Organization }) {
  const t = await getTranslations("organizationHeader");

  return (
    <div className="">
      {/* Cover Image with Gradient and Blur */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full bg-muted">
        {/* Image fills entire container */}
        <Image
          src={getImageUrl(organization.coverImage)}
          alt={organization.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        {/* Gradient Overlay for blending image with content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {/* Blurry container at the bottom with fade effect */}
        {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/900 to-transparent  transition-all duration-500 ease-in-out" /> */}
      </div>

      {/* Content Container with transparent background */}

      <div className="container mx-auto px-4 relative -mt-32 pb-4">
        <div className="relative flex flex-col !items-center sm:flex-row sm:items-end gap-6 z-10">
          {/* Profile Image and Info */}
          <div className="flex items-center gap-6 justify-center">
            <div className="relative z-20 justify-center items-center">
              <Image
                src={getImageUrl(organization.logo)}
                alt={organization.name}
                width={180}
                height={180}
                className="rounded-xl border-4 border-background shadow-lg"
              />
            </div>
            <div className="mb-4 space-y-2 text-white z-20">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#fff]">{organization.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 " />
                  <span>{t("followers", { count: organization._count.followers })}</span>
                </div>
                <span>•</span>
                <span className="text-primary-foreground">{t("events", { count: organization._count.events })}</span>
              </div>
            </div>
          </div>

          <OrganizationActions organization={organization} />
        </div>

        {/* Navigation */}
        <nav className="flex gap-1 mt-8 overflow-x-auto pb-2 scrollbar-hide z-20 border-b-2">
          <Button variant="ghost" className="font-medium whitespace-nowrap">
            {t("sections.about")}
          </Button>
          <Button variant="ghost" className="font-medium whitespace-nowrap">
            {t("sections.events")}
          </Button>
          <Button variant="ghost" className="font-medium whitespace-nowrap">
            {t("sections.photos")}
          </Button>
          <Button variant="ghost" className="font-medium whitespace-nowrap">
            {t("sections.followers")}
          </Button>
        </nav>
      </div>
    </div>
  );
}
