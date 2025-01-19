import { Slider } from "@/components/ui/slider";
import { MapIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function SearchMap() {
  const t = useTranslations("searchPage.searchMap");

  const [, setCenter] = useState({
    lat: 14.7167,
    lng: -17.4677,
  });
  const [radius, setRadius] = useState(15000);
  const [, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(newCenter);
        setUserLocation(newCenter);
      });
    }
  }, []);

  return (
    <div className="space-y-4">
      {showMap ? (
        <>
          <div className="p-4 bg-white rounded-lg shadow">
            <label className="text-sm font-medium">
              {t("searchRadius")}: {radius / 1000}km
            </label>
            <Slider
              value={[radius]}
              onValueChange={(value) => setRadius(value[0])}
              min={1000}
              max={50000}
              step={1000}
              defaultValue={[15000]}
              className="mt-2"
            />
          </div>
          {/* Add Map */}
        </>
      ) : (
        <button
          onClick={() => setShowMap(true)}
          className="bg-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow font-semibold text-gray-800 flex items-center gap-2"
        >
          <MapIcon className="w-5 h-5" />
          {t("viewMap")}
        </button>
      )}
    </div>
  );
}
