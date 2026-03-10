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

  const handleRouteSubmit = async ({ from, to }) => {
    setIsLoadingRoute(true);
    setRouteError("");
    setWeatherError("");
    setWeatherData(null);

    try {
      const route = await fetchRoute({ from, to });
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
    } finally {
      setIsLoadingRoute(false);
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
