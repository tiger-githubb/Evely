import { OrganizationHeader } from "./_components/organization-header";
import { OrganizationStats } from "./_components/organization-stats";
import { RecentEvents } from "./_components/recent-events";
import { RevenueChart } from "./_components/revenue-chart";
import { UpcomingEvents } from "./_components/upcoming-events";

interface WorkspacePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function OrganizationWorkspacePage({ params }: WorkspacePageProps) {
  const { slug } = await params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <OrganizationHeader organizationSlug={slug} />
      <OrganizationStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentEvents />
        <UpcomingEvents />
      </div>

      <RevenueChart />
    </div>
  );
}
