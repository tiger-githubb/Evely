import { Event } from "@/types/api/event.type";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface SearchMapProps {
  events: Event[];
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const customMarkerIcon = {
  url: "/map-marker.svg", // Add your custom marker SVG to public folder
  scaledSize: { width: 40, height: 40 },
  origin: { x: 0, y: 0 },
  anchor: { x: 20, y: 40 },
};

export function SearchMap({ events }: SearchMapProps) {
  const [center, setCenter] = useState({
    lat: 14.7167, // Default to Dakar until we get user location
    lng: -17.4677,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div className="h-[calc(100vh-2rem)] sticky top-4">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
          {events.map(
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
                    scaledSize: new window.google.maps.Size(customMarkerIcon.scaledSize.width, customMarkerIcon.scaledSize.height),
                    origin: new window.google.maps.Point(customMarkerIcon.origin.x, customMarkerIcon.origin.y),
                    anchor: new window.google.maps.Point(customMarkerIcon.anchor.x, customMarkerIcon.anchor.y),
                  }}
                  title={event.title}
                />
              )
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
