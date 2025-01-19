import { useEffect, useState } from "react";

let isScriptLoaded = false;

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    if (isScriptLoaded) {
      return;
    }

    isScriptLoaded = true;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);

    document.head.appendChild(script);

    return () => {
      // Don't remove the script on cleanup to prevent multiple loads
      isScriptLoaded = false;
    };
  }, []);

  return isLoaded;
}
