import { fetchOrganization } from "@/server/services/organizations.service";
import { OrganizationContent } from "./_components/organization-content";
import { OrganizationHeader } from "./_components/organization-header";

interface OrganizationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { slug } = await params;
  const organization = fetchOrganization(slug);
  const organizationData = (await organization).data;

  return (
    <div className="min-h-screen bg-muted/30">
      <OrganizationHeader organization={organizationData} />
      <OrganizationContent organization={organizationData} />
    </div>
  );
}
