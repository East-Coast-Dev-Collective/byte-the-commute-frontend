import { useState } from "react";
import NavBar from "../components/NavBar";
import FromToCard from "../components/FromToCard";
import MapCard from "../components/MapCard";
import AuthCard from "../components/AuthCard";
import TransitDetailsCard from "../components/TransitDetailsCard";
import WeatherCard from "../components/WeatherCard";
import { fetchRoute } from "../services/routeService";
import { getWeather } from "../services/weatherService";

const Home = ({ user, onLogin, onRegister, onLogout }) => {
  const [routeData, setRouteData] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState("");
  const [hasSearchedRoute, setHasSearchedRoute] = useState(false);

  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState("");
  const showAuthCard = !user && !hasSearchedRoute;

  const handleRouteSubmit = async ({ from, to, mode }) => {
    let route = null;

    setHasSearchedRoute(true);
    setIsLoadingRoute(true);
    setRouteError("");
    setWeatherError("");
    setWeatherData(null);

    try {
      route = await fetchRoute({ from, to, mode });
      setRouteData(route);
    } catch (err) {
      setRouteData(null);
      setRouteError(err.message || "Could not fetch route.");
      setWeatherData(null);
      setWeatherError("");
      return;
    } finally {
      setIsLoadingRoute(false);
    }

    const lat = route?.endLocation?.lat;
    const lng = route?.endLocation?.lng;

    if (lat == null || lng == null) {
      setWeatherData(null);
      setWeatherError("Route has no destination location for weather lookup.");
      return;
    }

    try {
      const weather = await getWeather({ lat, lng });
      setWeatherData(weather);
    } catch (err) {
      setWeatherData(null);
      setWeatherError(err.message || "Could not fetch weather.");
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />
      <NavBar />
      <main className={`home-layout ${showAuthCard ? "home-layout--guest" : ""}`}>
        <div className="home-slot home-slot--form">
          <FromToCard
            onRouteSubmit={handleRouteSubmit}
            isLoading={isLoadingRoute}
            error={routeError}
            user={user}
            onLogout={onLogout}
          />
        </div>
        {showAuthCard && (
          <div className="home-slot home-slot--auth">
            <AuthCard onLogin={onLogin} onRegister={onRegister} />
          </div>
        )}
        <div className="home-slot home-slot--map">
          <MapCard
            routeData={routeData}
            isLoading={isLoadingRoute}
            error={routeError}
          />
        </div>
        <div className="home-slot home-slot--transit">
          <TransitDetailsCard
            mode={routeData?.mode}
            transitSteps={routeData?.transitSteps}
            isLoading={isLoadingRoute}
            error={routeError}
          />
        </div>
        <div className="home-slot home-slot--weather">
          <WeatherCard weatherData={weatherData} error={weatherError} />
        </div>
      </main>
    </div>
  );
};

export default Home;
