import { useState, useEffect } from "react";

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return isLoaded;
}
