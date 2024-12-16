import { BadgeCell } from "@/components/shared/table/badge-cell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Organization } from "@/types/api/organization.type";
import { Users } from "lucide-react";

interface OrganizationStatsProps {
  organization: Organization;
}

export function OrganizationStats({ organization }: OrganizationStatsProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="">Statistiques détaillées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Membres</span>
            </div>
            <BadgeCell value={organization._count.users} variant="secondary" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Followers</span>
            </div>
            <BadgeCell value={organization._count.followers} variant="secondary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
