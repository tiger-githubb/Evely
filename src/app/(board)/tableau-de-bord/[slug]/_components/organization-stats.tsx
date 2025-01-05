import { StatCard } from "@/components/shared/stat-card";

export function OrganizationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Total Événements" value="24" icon="calendar" />
      <StatCard title="Participants" value="1,234" icon="users" />
      <StatCard title="Revenus" value="2,500,000 FCFA" icon="dollar-sign" />
      <StatCard title="Taux de satisfaction" value="98%" icon="smile" />
    </div>
  );
}
