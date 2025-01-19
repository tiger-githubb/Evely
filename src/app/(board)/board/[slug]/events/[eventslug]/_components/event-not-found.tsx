import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { Calendar, Home } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function EventNotFound() {
  const t = await getTranslations("eventNotFound");

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20vh)]">
      <Card className="w-full max-w-2xl mx-4 border-none">
        <CardHeader className="text-center">
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Link href={routes.board.workspace.events.list("default-slug")}>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              {t("viewEvents")}
            </Button>
          </Link>
          <Link href={routes.board.dashboard}>
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              {t("backToDashboard")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
