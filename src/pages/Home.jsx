import { useState } from "react";
import NavBar from "../components/NavBar";
import FromToCard from "../components/FromToCard";
import MapCard from "../components/MapCard";
import WeatherCard from "../components/WeatherCard";
import { fetchRoute } from "../services/routeService";

const Home = () => {
  const [routeData, setRouteData] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState("");

  const handleRouteSubmit = async ({ from, to, mode }) => {
    setIsLoadingRoute(true);
    setRouteError("");

    try {
      const route = await fetchRoute({ from, to, mode });
      setRouteData(route);
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
