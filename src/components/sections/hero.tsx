import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Section from "../ui/custom/section";

export const Hero = () => (
  <Section className="md:mt-30 h-[55vh]">
    <div className="grid grid-cols-1 gap-4 items-center md:grid-cols-2 h-full">
      <div className="flex gap-4 flex-col">
        <div>
          <Badge variant="outline">Créez, partagez, vivez.</Badge>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-6xl max-w-lg tracking-tighter text-left font-semibold">
            Pour ceux qui aiment vivre l&apos;instant.
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          <Button size="lg" className="gap-4">
            Voir tout les événements <MoveRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="bg-muted rounded-md h-full"></div>
        <div className="bg-muted rounded-md h-full row-span-2"></div>
        <div className="bg-muted rounded-md h-full"></div>
      </div>
    </div>
  </Section>
);
