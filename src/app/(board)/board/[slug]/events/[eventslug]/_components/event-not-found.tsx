import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { Calendar, Home } from "lucide-react";
import Link from "next/link";

export default function EventNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20vh)]">
      <Card className="w-full max-w-2xl mx-4 border-none">
        <CardHeader className="text-center">
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <CardTitle className="text-2xl">Événement introuvable</CardTitle>
          <CardDescription>
            L&apos;événement que vous recherchez n&apos;existe pas ou vous n&apos;avez pas les permissions nécessaires pour y
            accéder.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Link href={routes.board.workspace.events.list("default-slug")}>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Voir les événements
            </Button>
          </Link>
          <Link href={routes.board.dashboard}>
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Retour au tableau de bord
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
