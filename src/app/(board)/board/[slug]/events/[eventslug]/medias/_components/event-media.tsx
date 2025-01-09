"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface EventMediaProps {
  covers: string[];
  video?: string;
}

export default function EventMedia({ covers, video }: EventMediaProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Covers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {covers.map((cover, index) => (
              <Image
                key={index}
                src={cover}
                alt={`Event Cover ${index + 1}`}
                width={400}
                height={300}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {video && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Event Video</CardTitle>
          </CardHeader>
          <CardContent>
            <video controls className="w-full rounded-lg">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
