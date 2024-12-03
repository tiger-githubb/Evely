import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import image1 from "@public/images/sliders/afrique-event.jpg";
import image2 from "@public/images/sliders/evenement-fete.jpeg";
import image3 from "@public/images/sliders/evenement-mode.jpeg";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Section from "../ui/custom/section";

export const Hero = () => {
  const images = [image1, image2, image3];
  const shuffledImages = [...images].sort(() => Math.random() - 0.5);

  return (
    <Section className="md:mt-30 h-[55vh]">
      <div className="grid grid-cols-1 gap-4 items-center md:grid-cols-2 h-full">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">Créez, partagez, vivez.</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="tracking-tighter text-left font-semibold">Pour ceux qui aiment vivre l&apos;instant.</h1>
          </div>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="gap-4">
              Voir tout les événements <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="relative rounded-md h-full overflow-hidden">
            <Image src={shuffledImages[0]} alt="Événement" fill className="object-cover" />
          </div>
          <div className="relative rounded-md h-full row-span-2 overflow-hidden">
            <Image src={shuffledImages[1]} alt="Événement" fill className="object-cover" />
          </div>
          <div className="relative rounded-md h-full overflow-hidden">
            <Image src={shuffledImages[2]} alt="Événement" fill className="object-cover" />
          </div>
        </div>
      </div>
    </Section>
  );
};
