"use client";

import { Card } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { Organization } from "@/types/api/organization.type";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Facebook, Globe, Instagram, Linkedin, MapPin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function SocialLinks({ socialLinks }: { socialLinks: Organization["socialLinks"] }) {
  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
  };

  return (
    <div className="flex gap-4 pt-2">
      {Object.entries(socialLinks || {}).map(([key, value]) => {
        const Icon = socialIcons[key as keyof typeof socialIcons];
        return value && Icon ? (
          <Link
            key={key}
            href={value}
            target="_blank"
            aria-label={`Visit our ${key} page`}
            className="hover:scale-110 transition-transform"
          >
            <Icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </Link>
        ) : null;
      })}
    </div>
  );
}

function EventsSection({ events, title }: { events: Organization["upcomingEvents"] | Organization["pastEvents"]; title: string }) {
  return (
    <section>
      <h2 className="font-semibold text-xl mb-6">{title}</h2>
      <div className="grid gap-6">
        {events?.map((event) => (
          <Link href={routes.events.details(event.slug)} key={event.id} aria-label={`View details for ${event.title}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                  <Image src={event.covers[0] || "/placeholder-image.jpg"} alt={event.title} fill className="object-cover" />
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
  );
}

export function OrganizationContent({ organization }: { organization: Organization }) {
  const t = useTranslations("organizationContent");

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-6">
            <h2 className="font-semibold text-xl mb-4">{t("about")}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{organization.description}</p>
            <div className="space-y-4">
              {organization.website && (
                <Link
                  href={organization.website}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  aria-label="Visit the official website"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm">{t("website")}</span>
                </Link>
              )}
              {organization.socialLinks && <SocialLinks socialLinks={organization.socialLinks} />}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 space-y-8">
          {organization.upcomingEvents && organization.upcomingEvents.length > 0 && (
            <EventsSection events={organization.upcomingEvents} title={t("upcomingEvents")} />
          )}
          {organization.pastEvents && organization.pastEvents.length > 0 && (
            <EventsSection events={organization.pastEvents} title={t("pastEvents")} />
          )}
        </div>
      </div>
    </div>
  );
}
