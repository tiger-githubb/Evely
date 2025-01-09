"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Globe } from "lucide-react";
import { Event } from "@/types/api/event.type";

interface EventInfoProps {
  event: Event;
}

export function EventInfo({ event }: EventInfoProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-gray-500" /> {event.title || "À propos de l'événement"}
            </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{event.content}</p>
          <div className="flex items-center gap-4 mt-4">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">
              {event.startTime} - {event.endTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
