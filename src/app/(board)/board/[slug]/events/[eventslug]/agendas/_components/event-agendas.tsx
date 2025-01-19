"use client";

import { BadgeCell } from "@/components/shared/table/badge-cell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface EventAgendasProps {
  agendas: { id: number; name: string; description: string; startTime: string; endTime: string }[];
}

export default function EventAgendas({ agendas }: EventAgendasProps) {
  const t = useTranslations("EventAgendas");

  if (!agendas.length) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{t("noAgendasTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("noAgendasMessage")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {agendas.map((agenda) => (
        <Card key={agenda.id} className="shadow-sm">
          <CardHeader>
            <CardTitle>{agenda.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-2">{agenda.description}</p>
            <div className="flex justify-between text-sm">
              <BadgeCell value={`${t("startTimeLabel")}: ${agenda.startTime}`} variant="secondary" />
              <BadgeCell value={`${t("endTimeLabel")}: ${agenda.endTime}`} variant="secondary" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
