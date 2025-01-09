import { fetchOrganization } from "@/server/services/organizations.service";
import { OrganizationHeader } from "./_components/organization-header";
import { OrganizationNav } from "./_components/organization-nav";
import OrganizationNotFound from "./_components/organization-not-found";

interface OrganizationLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export default async function OrganizationLayout({ children, params }: OrganizationLayoutProps) {
  const { slug } = await params;
  const organizationResponse = await fetchOrganization(slug);
  //TODO: Move Update Organisation Out of the layout
  if (!organizationResponse?.data) {
    return <OrganizationNotFound />;
  }

  return (
    <div className="space-y-6">
      <OrganizationHeader organization={organizationResponse.data} />
      <div className="mx-auto w-full space-y-4 max-w-7xl px-4 lg:px-6">
        <OrganizationNav organizationId={slug} />
        {children}
      </div>
    </div>
  );
}
