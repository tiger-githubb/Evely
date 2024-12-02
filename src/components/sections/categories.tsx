import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Briefcase, Calendar, Moon, Music, Ticket, Users, Utensils } from "lucide-react";
import Link from "next/link";
import Section from "../ui/custom/section";

const categories = [
  {
    icon: <Music className="w-8 h-8" />,
    label: "Musique",
    href: routes.events,
  },
  {
    icon: <Moon className="w-8 h-8" />,
    label: "Vie nocturne",
    href: routes.events,
  },
  {
    icon: <Ticket className="w-8 h-8" />,
    label: "Arts du spectacle",
    href: routes.events,
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    label: "Fêtes",
    href: routes.events,
  },
  {
    icon: <Users className="w-8 h-8" />,
    label: "Rencontres",
    href: routes.events,
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    label: "Affaires",
    href: routes.events,
  },
  {
    icon: <Utensils className="w-8 h-8" />,
    label: "Gastronomie",
    href: routes.events,
  },
];

export const Categories = () => {
  return (
    <Section className="md:my-6">
      <div className="flex gap-6 md:gap-8 overflow-x-auto">
        {categories.map((category) => (
          <Link href={category.href} key={category.label}>
            <Button variant="outline" className="w-32 h-32 flex-col gap-4 p-4 text-center  rounded-full">
              {category.icon}
              <span className="font-medium text-sm leading-tight">{category.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </Section>
  );
};
