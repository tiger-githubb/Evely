import { Organization } from "@/types/api/organization.type";
import { Card } from "@/components/ui/card";
import { Globe, Facebook, Twitter, Instagram, Linkedin, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { routes } from "@/config/routes";

export function OrganizationContent({ organization }: { organization: Organization }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-6">
            <h2 className="font-semibold text-xl mb-4">À propos</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{organization.description}</p>

            <div className="space-y-4">
              {organization.website && (
                <Link
                  href={organization.website}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm">Site web officiel</span>
                </Link>
              )}

              {organization.socialLinks && (
                <div className="flex gap-4 pt-2">
                  {Object.entries(organization.socialLinks).map(([key, value]) => {
                    const Icon = {
                      facebook: Facebook,
                      twitter: Twitter,
                      instagram: Instagram,
                      linkedin: Linkedin,
                    }[key];
                    return value && Icon ? (
                      <Link key={key} href={value} target="_blank" className="hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                      </Link>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 space-y-8">
          {/* Upcoming Events */}
          {organization.upcomingEvents && organization.upcomingEvents.length > 0 && (
            <section>
              <h2 className="font-semibold text-xl mb-6">Événements à venir</h2>
              <div className="grid gap-6">
                {organization.upcomingEvents.map((event) => (
                  <Link href={routes.events.details(event.slug)} key={event.id}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                          <Image src={event.covers[0]} alt={event.title} fill className="object-cover" />
                        </div>
                        <div className="p-6 flex-1">
                          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{format(new Date(event.date), "d MMMM yyyy", { locale: fr })}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location.name}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{event.summary}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Past Events with similar card structure */}
          {organization.pastEvents && organization.pastEvents.length > 0 && (
            <section>
              <h2 className="font-semibold text-xl mb-6">Événements passés</h2>
              <div className="grid gap-6">
                {organization.pastEvents.map((event) => (
                  <Link href={routes.events.details(event.slug)} key={event.id}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow opacity-75 hover:opacity-100">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                          <Image src={event.covers[0]} alt={event.title} fill className="object-cover" />
                        </div>
                        <div className="p-6 flex-1">
                          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{format(new Date(event.date), "d MMMM yyyy", { locale: fr })}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location.name}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{event.summary}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
