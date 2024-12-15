"use client";

import { OrganizationDetailsSkeleton } from "@/components/shared/ui-skeletons";
import { getOrganization } from "@/server/services/organizations.service";
import { useQuery } from "@tanstack/react-query";
import { OrganizationHeader } from "./organization-header";
import { OrganizationInfo } from "./organization-info";
import { OrganizationStats } from "./organization-stats";

interface OrganizationDetailsProps {
  organizationId: string;
}

export function OrganizationDetails({ organizationId }: OrganizationDetailsProps) {
  const { data: organizationResponse, isLoading } = useQuery({
    queryKey: ["organization", organizationId],
    queryFn: () => getOrganization(organizationId),
  });

  const organization = organizationResponse?.data;

  if (isLoading) return <OrganizationDetailsSkeleton />;
  if (!organization) return null;

  return (
    <div className="space-y-8">
      <OrganizationHeader organization={organization} />
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <OrganizationInfo organization={organization} />
          <OrganizationStats organization={organization} />
        </div>
      </div>
    </div>
  );
}
