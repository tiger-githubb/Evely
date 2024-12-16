import InvitationsTable from "./_components/data-table";

interface InvitationsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function InvitationsPage({ params }: InvitationsPageProps) {
  const { slug } = await params;
  return <InvitationsTable organizationId={slug} />;
}
