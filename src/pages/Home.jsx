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

  /* DEBUG HELPER:
      Uncomment `await runWeatherDebugTest(); return;` inside handleRouteSubmit
      to test weather without depending on the route API
  */
  const runWeatherDebugTest = async () => {
    try {
      const weather = await getWeather({
        lat: 41.8781, //Chicago
        lng: -87.6298,
      });

      setWeatherData(weather);
      console.log("DEBUG weather from backend:", weather);
    } catch (err) {
      setWeatherData(weather);
      setWeatherError(err.message || "Could not fetch weather.");
      console.error("DEBUG weather test failed.", err);
    }
  };

  const handleRouteSubmit = async ({ from, to }) => {
    setIsLoadingRoute(true);
    setRouteError("");
    setWeatherError("");
    setWeatherData(null);

    try {
      //DEBUG:
      // Uncomment the next 2 lines to test weather without route working.
      // await runWeatherDebugTest();
      // return;

      const route = await fetchRoute({ from, to });
      setRouteData(route);

      if (route?.endLocation?.lat != null && route?.endLocation?.lng != null) {
        try {
          const weather = await getWeather({
            lat: route.endLocation.lat,
            lng: route.endLocation.lng,
          });
          setWeatherData(null);
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
      <WeatherCard />
    </div>
  );
};

export default Home;
