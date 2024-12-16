import RolesTable from "./_components/data-table";

interface RolesPageProps {
  params: {
    slug: string;
  };
}

export default async function RolesPage({ params }: RolesPageProps) {
  const { slug } = params;
  return (
    <div className="space-y-6">
      <RolesTable organizationId={slug} />
    </div>
  );
}
