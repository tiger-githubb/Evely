import { fetchOrganization } from "@/server/services/organizations.service";
import { OrganizationHeader } from "./_components/organization-header";
import { OrganizationNav } from "./_components/organization-nav";
import OrganizationNotFound from "./_components/organization-not-found";

export default async function OrganizationLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  const organizationResponse = await fetchOrganization(params.slug);

  if (!organizationResponse?.data) {
    return <OrganizationNotFound />;
  }

  return (
    <div className="space-y-6">
      <OrganizationHeader organization={organizationResponse.data} />
      <div className="mx-auto w-full space-y-4 max-w-7xl px-4 lg:px-6">
        <OrganizationNav organizationId={params.slug} />
        {children}
      </div>
    </div>
  );
}
