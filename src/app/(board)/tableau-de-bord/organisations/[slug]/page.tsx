import { OrganizationDetails } from "./_components/organization-details";

interface OrganizationPageProps {
  params: {
    slug: string;
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { slug } = await params;
  return <OrganizationDetails organizationId={slug} />;
}
