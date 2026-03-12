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
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const mapListenersRef = useRef([]);

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

    if (startMarkerRef.current) {
      startMarkerRef.current.setMap(null);
      startMarkerRef.current = null;
    }

    if (endMarkerRef.current) {
      endMarkerRef.current.setMap(null);
      endMarkerRef.current = null;
    }

    mapListenersRef.current.forEach((listener) => listener.remove());
    mapListenersRef.current = [];

    if (isLoading || error || !routeData?.polyline) {
      return;
    }

    const startLat = Number(routeData?.startLocation?.lat);
    const startLng = Number(routeData?.startLocation?.lng);
    const endLat = Number(routeData?.endLocation?.lat);
    const endLng = Number(routeData?.endLocation?.lng);
    if (
      Number.isNaN(startLat) ||
      Number.isNaN(startLng) ||
      Number.isNaN(endLat) ||
      Number.isNaN(endLng)
    ) {
      return;
    }

    const decodedPath = window.google.maps.geometry.encoding.decodePath(
      routeData.polyline,
    );
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

    startMarkerRef.current = new window.google.maps.Marker({
      position: { lat: startLat, lng: startLng },
      map: mapRef.current,
      title: "Start",
      label: "A",
    });

    endMarkerRef.current = new window.google.maps.Marker({
      position: { lat: endLat, lng: endLng },
      map: mapRef.current,
      title: "End",
      label: "B",
    });

    const bounds = new window.google.maps.LatLngBounds();

    decodedPath.forEach((point) => bounds.extend(point));
    bounds.extend({ lat: startLat, lng: startLng });
    bounds.extend({ lat: endLat, lng: endLng });

    mapRef.current.fitBounds(bounds);

    const boundsListener = window.google.maps.event.addListenerOnce(
      mapRef.current,
      "bounds_changed",
      () => {
        const zoom = mapRef.current.getZoom();

        if (zoom > 15) {
          mapRef.current.setZoom(15);
        }
      },
    );

    mapListenersRef.current.push(boundsListener);
  }, [routeData, isLoading, error]);

  useEffect(() => {
    return () => {
      if (routePolylineRef.current) {
        routePolylineRef.current.setMap(null);
        routePolylineRef.current = null;
      }

      if (startMarkerRef.current) {
        startMarkerRef.current.setMap(null);
        startMarkerRef.current = null;
      }

      if (endMarkerRef.current) {
        endMarkerRef.current.setMap(null);
        endMarkerRef.current = null;
      }

      mapListenersRef.current.forEach((listener) => listener.remove());
      mapListenersRef.current = [];
      mapRef.current = null;
    };
  }, []);

  const showMap =
    !isLoading && !error && !mapError && Boolean(routeData?.polyline);

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
          display: showMap ? "block" : "none",
        }}
      />
      {isLoading && <p>Loading route...</p>}
      {!isLoading && error && <p className="error-text">{error}</p>}
      {!isLoading && !error && mapError && (
        <p className="error-text">{mapError}</p>
      )}
      {!isLoading && !error && routeData && (
        <div className="route-stats">
          <p className="route-stats__trip">
            {routeData.from} to {routeData.to}
          </p>
          <div className="route-stat">
            <span className="route-stat__label">Mode</span>
            <span className="route-stat__value route-stat__value--mode">
              {routeData.mode ?? "N/A"}
            </span>
          </div>
          <div className="route-stat">
            <span className="route-stat__label">Distance</span>
            <span className="route-stat__value">
              {routeData.distanceText ?? "N/A"}
            </span>
          </div>
          <div className="route-stat">
            <span className="route-stat__label">Duration</span>
            <span className="route-stat__value">
              {routeData.durationText ?? "N/A"}
            </span>
          </div>
        </div>
      )}
      {!isLoading && !error && !routeData && (
        <p className="empty-text">Search for a route to begin.</p>
      )}
      {!isLoading && !error && !routeData && (
        <p>Search for a route to begin.</p>
      )}

      {!isLoading &&
        !error &&
        !mapError &&
        routeData &&
        !routeData.polyline && <p>No route data available.</p>}
    </section>
  );
};

export default MapCard;
