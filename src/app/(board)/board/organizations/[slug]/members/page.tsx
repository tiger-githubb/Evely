import MembersTable from "./_components/data-table";

interface MembersPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MembersPage({ params }: MembersPageProps) {
  const { slug } = await params;
  return <MembersTable organizationId={slug} />;
}
