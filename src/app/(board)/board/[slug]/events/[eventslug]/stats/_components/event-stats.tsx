import { BadgeCell } from "@/components/shared/table/badge-cell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Tag } from "lucide-react";

interface EventStatsProps {
  date: string;
  startTime: string;
  endTime: string;
  tags: { id: number; name: string }[];
}

export default function EventStats({ date, startTime, endTime, tags }: EventStatsProps) {
  return (
    <div className="space-y-6">
      {/* Event Date and Time */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            Date et Heure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-700">Date</div>
            <BadgeCell value={new Date(date).toLocaleDateString()} variant="secondary" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-700">Heure de début</div>
            <BadgeCell value={startTime} variant="secondary" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-700">Heure de fin</div>
            <BadgeCell value={endTime} variant="secondary" />
          </div>
        </CardContent>
      </Card>

      {/* Event Tags */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-gray-500" />
            Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-muted text-sm text-gray-700 px-3 py-1 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucun tag associé à cet événement</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
