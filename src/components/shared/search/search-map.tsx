import { Slider } from "@/components/ui/slider";
import { Event } from "@/types/api/event.type";
import { Circle, GoogleMap, InfoWindow, LoadScript, Marker, MarkerClusterer } from "@react-google-maps/api";
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
  scaledSize: { width: 40, height: 40 },
  origin: { x: 0, y: 0 },
  anchor: { x: 20, y: 40 },
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

export function SearchMap({ events }: SearchMapProps) {
  const [center, setCenter] = useState({
    lat: 14.7167,
    lng: -17.4677,
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [radius, setRadius] = useState(15000);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [showMap, setShowMap] = useState(false);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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

  const filteredEvents = events.filter((event) => {
    if (!userLocation || !event.location) return true;
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      parseFloat(event.location.lat),
      parseFloat(event.location.long)
    );
    return distance <= radius / 1000;
  });

  return (
    <div className="space-y-4">
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
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={11}
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
                      {filteredEvents.map(
                        (event) =>
                          event.location && (
                            <Marker
                              key={event.id}
                              position={{
                                lat: parseFloat(event.location.lat),
                                lng: parseFloat(event.location.long),
                              }}
                              icon={{
                                url: customMarkerIcon.url,
                                scaledSize: new window.google.maps.Size(
                                  customMarkerIcon.scaledSize.width,
                                  customMarkerIcon.scaledSize.height
                                ),
                                origin: new window.google.maps.Point(customMarkerIcon.origin.x, customMarkerIcon.origin.y),
                                anchor: new window.google.maps.Point(customMarkerIcon.anchor.x, customMarkerIcon.anchor.y),
                              }}
                              onClick={() => setSelectedEvent(event)}
                              clusterer={clusterer}
                              animation={google.maps.Animation.DROP}
                            />
                          )
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
                    <div className="p-2 max-w-xs">
                      <h4 className="font-semibold text-sm mb-1">{selectedEvent.title}</h4>
                      <p className="text-sm text-gray-600">{selectedEvent.location.name}</p>
                      {userLocation && (
                        <p className="text-xs text-gray-500 mt-1">
                          Distance:{" "}
                          {calculateDistance(
                            userLocation.lat,
                            userLocation.lng,
                            parseFloat(selectedEvent.location.lat),
                            parseFloat(selectedEvent.location.long)
                          ).toFixed(1)}{" "}
                          km
                        </p>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
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
