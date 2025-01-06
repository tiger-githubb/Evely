import { Button } from "@/components/ui/button";
import { Organization } from "@/types/api/organization.type";
import { Users } from "lucide-react";
import Image from "next/image";
import { OrganizationActions } from "./organization-actions";

export function OrganizationHeader({ organization }: { organization: Organization }) {
  return (
    <div className="bg-background">
      {/* Cover Image */}
      <div className="relative h-[200px] sm:h-[300px] md:h-[400px] w-full bg-muted">
        <Image
          src={organization.coverImage}
          alt={organization.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-24 pb-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Profile Image and Info */}
            <div className="flex items-end gap-6">
              <div className="relative">
                <Image
                  src={organization.logo}
                  alt={organization.name}
                  width={180}
                  height={180}
                  className="rounded-xl border-4 border-background shadow-lg"
                />
              </div>
              <div className="mb-4 space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{organization.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{organization._count.followers} followers</span>
                  </div>
                  <span>•</span>
                  <span>{organization._count.events} événements</span>
                </div>
              </div>
            </div>

            <OrganizationActions organization={organization} />
          </div>

          {/* Navigation */}
          <nav className="flex gap-1 mt-8 overflow-x-auto pb-2 scrollbar-hide">
            <Button variant="ghost" className="font-medium whitespace-nowrap">
              À propos
            </Button>
            <Button variant="ghost" className="font-medium whitespace-nowrap">
              Événements
            </Button>
            <Button variant="ghost" className="font-medium whitespace-nowrap">
              Photos
            </Button>
            <Button variant="ghost" className="font-medium whitespace-nowrap">
              Followers
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
