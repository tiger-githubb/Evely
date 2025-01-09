"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCell } from "@/components/shared/table/badge-cell";

interface EventAgendasProps {
  agendas: { id: number; name: string; description: string; startTime: string; endTime: string }[];
}

export default function EventAgendas({ agendas }: EventAgendasProps) {
  if (!agendas.length) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>No Agendas Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">This event currently has no agendas.</p>
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
              <BadgeCell value={`Start: ${agenda.startTime}`} variant="secondary" />
              <BadgeCell value={`End: ${agenda.endTime}`} variant="secondary" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
