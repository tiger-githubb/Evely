import { CustomButton } from "@/components/ui/custom/custom-button";
import { routes } from "@/config/routes";
import Link from "next/link";

interface OrganizationHeaderProps {
  organizationSlug: string;
}

export function OrganizationHeader({ organizationSlug }: OrganizationHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Organisation {organizationSlug}</h1>
        <p className="text-muted-foreground">Gérez vos événements et suivez vos performances</p>
      </div>
      <Link href={routes.board.workspace.events.add(organizationSlug)}>
        <CustomButton>Créer un événement</CustomButton>
      </Link>
    </div>
  );
}
