import { useEffect, useRef, useState } from "react";

let mapsSdkPromise = null;

const loadMapsSdk = (apiKey) => {
  if (window.google?.maps?.geometry) {
    return Promise.resolve(window.google);
  }

  if (mapsSdkPromise) {
    return mapsSdkPromise;
  }

  mapsSdkPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-js-sdk");
    if (existingScript) {
      if (existingScript.dataset.loaded === "true" && window.google?.maps) {
        resolve(window.google);
        return;
      }

      existingScript.addEventListener("load", () => resolve(window.google), {
        once: true,
      });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Maps JS SDK.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-js-sdk";
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=geometry`;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve(window.google);
    };
    script.onerror = () =>
      reject(new Error("Failed to load Google Maps JS SDK."));

    document.head.appendChild(script);
  });

  return mapsSdkPromise;
};

const MapCard = ({ routeData, isLoading, error }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "";
  const [mapError, setMapError] = useState("");
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const routePolylineRef = useRef(null);

  useEffect(() => {
    let isDisposed = false;

    const initMap = async () => {
      if (!apiKey) {
        setMapError("Missing VITE_GOOGLE_MAPS_API_KEY.");
        return;
      }

      try {
        await loadMapsSdk(apiKey);
        if (isDisposed || !mapContainerRef.current || mapRef.current) {
          return;
        }

        mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
          center: { lat: 42.3601, lng: -71.0589 },
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        setMapError("");
      } catch (sdkErr) {
        setMapError(sdkErr.message || "Map failed to initialize.");
      }
    };

    initMap();

    return () => {
      isDisposed = true;
    };
  }, [apiKey]);

  useEffect(() => {
    if (!mapRef.current || !window.google?.maps?.geometry) {
      return;
    }

    if (routePolylineRef.current) {
      routePolylineRef.current.setMap(null);
      routePolylineRef.current = null;
    }

    if (!routeData?.polyline) {
      return;
    }

    const startLat = Number(routeData?.startLocation?.lat);
    const startLng = Number(routeData?.startLocation?.lng);
    if (Number.isNaN(startLat) || Number.isNaN(startLng)) {
      return;
    }

    const decodedPath =
      window.google.maps.geometry.encoding.decodePath(routeData.polyline);
    if (!decodedPath.length) {
      return;
    }

    mapRef.current.setCenter({ lat: startLat, lng: startLng });

    routePolylineRef.current = new window.google.maps.Polyline({
      path: decodedPath,
      geodesic: true,
      strokeColor: "#2563eb",
      strokeOpacity: 0.9,
      strokeWeight: 5,
      map: mapRef.current,
    });
  }, [routeData]);

  return (
    <section>
      <h3>Route</h3>
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "320px",
          borderRadius: "8px",
          marginBottom: "12px",
          background: "#e5e7eb",
        }}
      />
      {isLoading && <p>Loading route...</p>}
      {!isLoading && error && <p className="error-text">{error}</p>}
      {!isLoading && !error && mapError && <p className="error-text">{mapError}</p>}
      {!isLoading && !error && routeData && (
        <>
          <p>
            {routeData.from} to {routeData.to}
          </p>
          <p>Mode: {routeData.mode}</p>
          <p>Distance: {routeData.distanceText ?? "N/A"}</p>
          <p>Duration: {routeData.durationText ?? "N/A"}</p>
        </>
      )}
      {!isLoading && !error && !routeData && <p>Search for a route to begin.</p>}
    </section>
  );
};

export default MapCard;
