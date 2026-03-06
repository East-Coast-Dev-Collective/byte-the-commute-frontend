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
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const handleRouteSubmit = async ({ from, to }) => {
    let route = null;

    setIsLoadingRoute(true);
    setRouteError("");

    try {
      route = await fetchRoute({ from, to });
      setRouteData(route);
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
      <WeatherCard
        weatherData={weatherData}
        isLoading={isLoadingWeather}
        error={weatherError}
      />
    </div>
  );
};

export default Home;
