import { fetchOrganizationBySlug } from "@/config/data";
import { OrganizationContent } from "./_components/organization-content";
import { OrganizationHeader } from "./_components/organization-header";

export default function OrganizationPage({ params }: { params: { slug: string } }) {
  const organization = fetchOrganizationBySlug(params.slug);

  return (
    <div className="min-h-screen bg-muted/30">
      <OrganizationHeader organization={organization} />
      <OrganizationContent organization={organization} />
    </div>
  );
}
