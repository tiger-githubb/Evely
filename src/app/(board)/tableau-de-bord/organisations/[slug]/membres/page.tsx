import MembersTable from "./_components/data-table";

interface MembersPageProps {
  params: {
    slug: string;
  };
}

export default async function MembersPage({ params }: MembersPageProps) {
  const { slug } = await params;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Membres de l&apos;organisation</h2>
      <MembersTable organizationId={slug} />
    </div>
  );
}
