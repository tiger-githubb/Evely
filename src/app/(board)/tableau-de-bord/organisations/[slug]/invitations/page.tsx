import InvitationsTable from "./_components/data-table";

interface InvitationsPageProps {
  params: {
    slug: string;
  };
}

export default async function InvitationsPage({ params }: InvitationsPageProps) {
  const { slug } = params;
  return <InvitationsTable organizationId={slug} />;
}
