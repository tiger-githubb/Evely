import { Slider } from "@/components/ui/slider";
import { Event } from "@/types/api/event.type";
import { Circle, GoogleMap, InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";
import { MapIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchMapProps {
  events: Event[];
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const customMarkerIcon = {
  url: "/map-marker.svg",
  scaledSize: window.google?.maps ? new window.google.maps.Size(40, 40) : null,
  origin: window.google?.maps ? new window.google.maps.Point(0, 0) : null,
  anchor: window.google?.maps ? new window.google.maps.Point(20, 40) : null,
};
const mapStyles = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
];

type MapCenter = {
  lat: number;
  lng: number;
  placeId: string;
};

const DEFAULT_LOME_CENTER: MapCenter = {
  lat: 6.182486,
  lng: 1.164289,
  placeId: "ChIJGVQYE8HhIxARHUGvLEK1JDI",
};

interface SearchMapProps {
  events: Event[];
}

import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { EventMapCard } from "../map/event-map-card";

export function SearchMap({ events }: SearchMapProps) {
  const isLoaded = useGoogleMaps();
  const [center, setCenter] = useState<MapCenter>(DEFAULT_LOME_CENTER);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [radius, setRadius] = useState(15000);
  const [showMap, setShowMap] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredEvents = events.filter((event: Event) => {
    if (!userLocation || !event.location) return true;
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      parseFloat(event.location.lat),
      parseFloat(event.location.long)
    );
    return distance <= radius / 1000;
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            placeId: DEFAULT_LOME_CENTER.placeId,
          });
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setCenter(DEFAULT_LOME_CENTER);
        }
      );
    } else {
      setCenter(DEFAULT_LOME_CENTER);
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="space-y-4">
      {selectedEvent && selectedEvent.location && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedEvent.location.lat),
            lng: parseFloat(selectedEvent.location.long),
          }}
          onCloseClick={() => setSelectedEvent(null)}
          options={{
            pixelOffset: new window.google.maps.Size(0, -40),
            disableAutoPan: false,
          }}
        >
          <EventMapCard
            event={selectedEvent as Event} // Type assertion since we know it's not null here
            userLocation={userLocation || undefined}
            onClose={() => setSelectedEvent(null)}
            calculateDistance={calculateDistance}
          />
        </InfoWindow>
      )}
      {showMap ? (
        <>
          <div className="p-4 bg-white rounded-lg shadow">
            <label className="text-sm font-medium">Search Radius: {radius / 1000}km</label>
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

          <div className="h-[calc(100vh-2rem)] sticky top-4">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              options={{
                styles: mapStyles,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: true,
              }}
            >
              {userLocation && (
                <>
                  <Circle
                    center={userLocation}
                    radius={5000}
                    options={{
                      fillColor: "#3b82f6",
                      fillOpacity: 0.1,
                      strokeColor: "#3b82f6",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                    }}
                  />
                  <Circle
                    center={userLocation}
                    radius={radius}
                    options={{
                      fillColor: "#f97316",
                      fillOpacity: 0.1,
                      strokeColor: "#f97316",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                    }}
                  />
                </>
              )}

              <MarkerClusterer>
                {(clusterer) => (
                  <>
                    {filteredEvents.map((event) =>
                      event.location ? (
                        <Marker
                          key={event.id}
                          position={{
                            lat: parseFloat(event.location.lat),
                            lng: parseFloat(event.location.long),
                          }}
                          icon={customMarkerIcon}
                          onClick={() => setSelectedEvent(event)}
                          clusterer={clusterer}
                        />
                      ) : null
                    )}
                  </>
                )}
              </MarkerClusterer>
              {selectedEvent && selectedEvent.location && (
                <InfoWindow
                  position={{
                    lat: parseFloat(selectedEvent.location.lat),
                    lng: parseFloat(selectedEvent.location.long),
                  }}
                  onCloseClick={() => setSelectedEvent(null)}
                >
                  <EventMapCard
                    event={selectedEvent}
                    userLocation={userLocation || undefined}
                    onClose={() => setSelectedEvent(null)}
                    calculateDistance={calculateDistance}
                  />
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </>
      ) : (
        <div className="h-[calc(100vh-2rem)] sticky top-4 bg-gray-200 rounded-lg flex items-center justify-center">
          <button
            onClick={() => setShowMap(true)}
            className="bg-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow font-semibold text-gray-800 flex items-center gap-2"
          >
            <MapIcon className="w-5 h-5" />
            View Map
          </button>
        </div>
      )}
    </div>
  );
}
