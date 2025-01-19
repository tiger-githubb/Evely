import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { Event } from "@/types/api/event.type";
import { getImageUrl } from "@/utils/image-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface SearchEventCardProps {
  event: Event;
}

export function SearchEventCard({ event }: SearchEventCardProps) {
  const t = useTranslations("searchPage");

  const coverImage = getImageUrl(event.covers[0]);

  return (
    <Link href={routes.events.details(event.slug)}>
      <Card className="group h-40 overflow-hidden transition-all hover:shadow-lg">
        <div className="flex h-full">
          <div className="relative w-32 h-full">
            {coverImage ? (
              <Image src={coverImage} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-emerald-400" />
            )}
          </div>

          <CardContent className="flex-1 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{format(new Date(event.date), "PPP", { locale: fr })}</span>
            </div>

            <h4 className="mt-1 font-semibold line-clamp-1">{event.title}</h4>

            {event.location && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{event.location.name}</span>
              </div>
            )}

            <div className="mt-2 flex items-center gap-2">
              <Image src={organizationLogo} alt={t("organizationLogoAlt")} width={16} height={16} className="rounded-full" />
              <span className="text-xs text-muted-foreground line-clamp-1">{event.organization.name}</span>
              <p className="text-sm line-clamp-2">{event.summary}</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
