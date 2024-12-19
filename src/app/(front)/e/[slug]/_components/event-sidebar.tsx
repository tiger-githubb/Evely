import { Event } from "@/types/api/event.type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function EventSidebar({ event }: { event: Event }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Button className="w-full" size="lg">
          Participer
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Organisateur</h3>
        <div className="flex items-center gap-3">
          <Image src={event.organization.logo} alt={event.organization.name} width={40} height={40} className="rounded-full" />
          <div>
            <p className="font-medium">{event.organization.name}</p>
            <p className="text-sm text-muted-foreground">Organisateur</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
