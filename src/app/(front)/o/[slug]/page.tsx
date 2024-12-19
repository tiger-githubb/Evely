import { fetchOrganizationBySlug } from "@/config/data";
import { OrganizationContent } from "./_components/organization-content";
import { OrganizationHeader } from "./_components/organization-header";

interface OrganizationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { slug } = await params;
  const organization = fetchOrganizationBySlug(slug);

  return (
    <div className="min-h-screen bg-muted/30">
      <OrganizationHeader organization={organization} />
      <OrganizationContent organization={organization} />
    </div>
  );
}
