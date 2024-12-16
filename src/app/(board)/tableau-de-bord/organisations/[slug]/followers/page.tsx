import FollowersTable from "./_components/data-table";

interface FollowersPageProps {
  params: {
    slug: string;
  };
}

export default async function FollowersPage({ params }: FollowersPageProps) {
  const { slug } = params;
  return (
    <div className="space-y-6">
      <FollowersTable organizationId={slug} />
    </div>
  );
}
