import { DateCell } from "@/components/shared/table/date-cell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Organization } from "@/types/api/organization.type";
import { Building2, Calendar, Shield } from "lucide-react";

interface OrganizationInfoProps {
  organization: Organization;
}

export function OrganizationInfo({ organization }: OrganizationInfoProps) {
  return (
    <div className="space-y-6 md:col-span-2">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <Building2 className="h-5 w-5 text-gray-500" />À propos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500">{organization.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">
                Membre depuis <DateCell date={organization.createdAt} />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <Shield className="h-5 w-5 text-gray-500" />
            Rôles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {organization.roles.map((role) => (
              <div key={role.role.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-gray-700">{role.role.name}</span>
                {!role.role.editable && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Système</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
