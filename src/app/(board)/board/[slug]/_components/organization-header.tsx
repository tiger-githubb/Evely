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
      <div className="flex gap-4">
      <Link href={routes.board.workspace.events.add(organizationSlug)}>
        <CustomButton>Créer un événement</CustomButton>
      </Link>
      <Link href={routes.board.workspace.events.list(organizationSlug)}>
        <CustomButton>Voir tous les événements</CustomButton>
      </Link>
      </div>
      
    </div>
  );
}
