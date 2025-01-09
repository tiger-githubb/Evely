"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, List } from "lucide-react";
import { BadgeCell } from "@/components/shared/table/badge-cell";
import { Event } from "@/types/api/event.type";

interface EventStatsProps {
  event: Event;
}

export function EventStats({ event }: EventStatsProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <List className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Agendas</span>
            </div>
            <BadgeCell value={event.agendas.length} variant="secondary" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Followers</span>
            </div>
            <BadgeCell value={event.organization._count.followers} variant="secondary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
