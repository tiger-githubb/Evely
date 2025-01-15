"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import type { CreateEventType } from "@/schemas/event.schema";

interface LocationSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function LocationSection({ form }: LocationSectionProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const location = {
        id: place.place_id,
        name: place.name || "",
        lat: (place.geometry?.location?.lat() || 0).toString(),
        long: (place.geometry?.location?.lng() || 0).toString(),
      };
      form.setValue("location", location); 
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Localisation</h3>

      <FormField
        control={form.control}
        name="location"
        render={() => (
          <FormItem className="sm:col-span-3">
            <FormLabel>Nom du lieu</FormLabel>
            <FormControl>
              <Input
                placeholder="Rechercher un lieu"
                onChange={() => {}}
                ref={(input) => {
                  if (input && !autocomplete) {
                    const autoCompleteInstance = new google.maps.places.Autocomplete(input, {});
                    autoCompleteInstance.addListener("place_changed", handlePlaceChanged);
                    setAutocomplete(autoCompleteInstance);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
