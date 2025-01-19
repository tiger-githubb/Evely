"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getImageUrl } from "@/utils/image-utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface EventMediaProps {
  covers: string[];
  video?: string;
}

const getVideoEmbed = (video: string) => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;

  if (youtubeRegex.test(video)) {
    const match = video.match(youtubeRegex);
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${match?.[1]}`,
    };
  }

  if (vimeoRegex.test(video)) {
    const match = video.match(vimeoRegex);
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${match?.[1]}`,
    };
  }

  return { type: "public", embedUrl: video }; // Default for public URLs
};

export default function EventMedia({ covers, video }: EventMediaProps) {
  const t = useTranslations("EventMedia");

  const videoData = video ? getVideoEmbed(video) : null;

  return (
    <div className="space-y-6">
      {covers && covers.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>{t("covers")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {covers.map((cover, index) => {
                try {
                  const coverUrl = getImageUrl(cover);
                  return (
                    <Image
                      key={index}
                      src={coverUrl.toString()}
                      alt={`${t("eventCover")} ${index + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  );
                } catch {
                  console.error(`Invalid URL: ${cover}`);
                  return null;
                }
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {videoData && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>{t("eventVideo")}</CardTitle>
          </CardHeader>
          <CardContent>
            {videoData.type === "youtube" && (
              <iframe
                src={videoData.embedUrl}
                title="YouTube video player"
                className="w-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {videoData.type === "vimeo" && (
              <iframe
                src={videoData.embedUrl}
                title="Vimeo video player"
                className="w-full rounded-lg"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}

            {videoData.type === "public" && (
              <video controls className="w-full rounded-lg">
                <source src={videoData.embedUrl} type="video/mp4" />
                {t("videoNotSupported")}
              </video>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
