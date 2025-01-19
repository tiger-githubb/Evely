import { DateCell } from "@/components/shared/table/date-cell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Organization } from "@/types/api/organization.type";
import { Building2, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface OrganizationInfoProps {
  organization: Organization;
}

export async function OrganizationInfo({ organization }: OrganizationInfoProps) {
  const t = await getTranslations("OrganizationInfo"); // Fetching translations for this component

  return (
    <div className="space-y-6 md:col-span-2">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <Building2 className="h-5 w-5 text-gray-500" />
            {t("about")} {/* Translated text */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500">{organization.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">
                {t("memberSince")} <DateCell date={organization.createdAt} />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
