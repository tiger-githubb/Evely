import { getTranslations } from "next-intl/server";
import Organizationstable from "./_components/table/data-table";

export default async function OrganizationsPage() {
  const t = await getTranslations("organizations");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{t("organizationsTitle")}</h1>
      <Organizationstable />
    </div>
  );
}
