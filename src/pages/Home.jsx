import NavBar from "../components/NavBar";
import FromToCard from "../components/FromToCard";
import MapCard from "../components/MapCard";
import WeatherCard from "../components/WeatherCard";

const Home = () => {
  const handleRouteSubmit = (routeData) => {
    console.log("Route received in parent:", routeData);
  };

  return (
    <div>
      <NavBar />
      <FromToCard onRouteSubmit={handleRouteSubmit} />
      <MapCard />
      <WeatherCard />
    </div>
  );
};

export default Home;
