import { useState } from "react";
import NavBar from "../components/NavBar";
import FromToCard from "../components/FromToCard";
import MapCard from "../components/MapCard";
import WeatherCard from "../components/WeatherCard";
import { fetchRoute } from "../services/routeService";
import { getWeather } from "../services/weatherService";

const Home = () => {
  const [routeData, setRouteData] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState("");


  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState("");

  const handleRouteSubmit = async ({ from, to, mode }) => {
    let route = null;

    setIsLoadingRoute(true);
    setRouteError("");
    setWeatherError("");
    setWeatherData(null);

    try {

      route = await fetchRoute({ from, to, mode });

      setRouteData(route);

      if (route?.endLocation?.lat != null && route?.endLocation?.lng != null) {
        try {
          const weather = await getWeather({
            lat: route.endLocation.lat,
            lng: route.endLocation.lng,
          });
          setWeatherData(weather);
          console.log("weather from backend:", weather);
        } catch (err) {
          setWeatherData(null);
          setWeatherError(err.message || "Could not fetch weather.");
        }
      }
    } catch (err) {
      setRouteData(null);
      setRouteError(err.message || "Could not fetch route.");
      setWeatherData(null);
      setWeatherError("");
      setIsLoadingWeather(false);
      return;
    } finally {
      setIsLoadingRoute(false);
    }

    const lat = route?.startLocation?.lat;
    const lng = route?.startLocation?.lng;
    if (lat == null || lng == null) {
      setWeatherData(null);
      setWeatherError("Route has no start location for weather lookup.");
      return;
    }

    setWeatherError("");
    setIsLoadingWeather(true);

    try {
      const weather = await getWeather({ lat, lng });
      setWeatherData(weather);
    } catch (weatherErr) {
      setWeatherData(null);
      setWeatherError(weatherErr.message || "Could not fetch weather.");
    } finally {
      setIsLoadingWeather(false);
    }
  };

  return (
    <div>
      <NavBar />
      <FromToCard
        onRouteSubmit={handleRouteSubmit}
        isLoading={isLoadingRoute}
        error={routeError}
      />

      <MapCard
        routeData={routeData}
        isLoading={isLoadingRoute}
        error={routeError}
      />
      <WeatherCard weatherData={weatherData} error={weatherError} />
    </div>
  );
};

export default Home;
