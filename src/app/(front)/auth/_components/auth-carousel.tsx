"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import * as React from "react";

type QuoteSlide = {
  quote: string;
  author: string;
  image: string;
};

type AuthCarouselProps = {
  slides: QuoteSlide[];
};

export function AuthCarousel({ slides }: AuthCarouselProps) {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[plugin.current, Fade()]}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="relative h-[calc(100vh-5rem)]">
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              sizes="50vw"
              className="object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
              <blockquote className="space-y-2">
                <p className="text-lg">{slide.quote}</p>
                <footer className="text-sm">{slide.author}</footer>
              </blockquote>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
