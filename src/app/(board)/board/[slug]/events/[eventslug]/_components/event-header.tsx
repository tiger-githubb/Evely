"use client";

import { Badge } from "@/components/ui/badge";
import { routes } from "@/config/routes";
import { Event } from "@/types/api/event.type";
import { getImageUrl } from "@/utils/image-utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PiPencilSimpleDuotone } from "react-icons/pi";

interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  const params = useParams();
  const { slug, eventslug } = params as { slug: string; eventslug: string };
  return (
    <div className="mt-0">
      <div className="relative -mx-4 h-36 sm:h-40 md:h-48 lg:-mx-6 lg:h-52 xl:h-60 2xl:h-72">
        {event.covers?.[0] ? (
          <Image src={getImageUrl(event.covers[0])} alt="Cover" fill className="object-cover" priority />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF]" />
        )}
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 lg:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-4">
            <div className="py-2">
              <h1 className="text-lg font-bold capitalize sm:text-xl lg:text-2xl">{event.title}</h1>
              <p className="text-sm text-gray-500">{event.summary}</p>
              <div className="flex gap-2 mt-2">
                {event.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link href={routes.board.workspace.events.edit(slug, eventslug)}>
              <button className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shadow">
                <PiPencilSimpleDuotone className="h-5 w-5 text-gray-600" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
