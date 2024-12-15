import { OrganizationDetails } from "./_components/organization-details";

interface OrganizationPageProps {
  params: {
    slug: string;
  };
}

export default function OrganizationPage({ params }: OrganizationPageProps) {
  return <OrganizationDetails organizationId={params.slug} />;
}
