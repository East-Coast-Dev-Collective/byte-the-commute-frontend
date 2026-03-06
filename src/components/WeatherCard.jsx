const WeatherCard = ({ weatherData, isLoading, error }) => {
  return (
    <section>
      <h3>Weather</h3>
      {isLoading && <p>Loading weather...</p>}
      {!isLoading && error && <p className="error-text">{error}</p>}
      {!isLoading && !error && weatherData && (
        <>
          <p>
            Temperature:{" "}
            {weatherData.temperature != null
              ? `${Math.round(weatherData.temperature)}°F`
              : "N/A"}
          </p>
          <p>Condition: {weatherData.condition ?? "N/A"}</p>
          {weatherData.iconUrl && (
            <img
              src={weatherData.iconUrl}
              alt={weatherData.condition ?? "Weather icon"}
              width="64"
              height="64"
            />
          )}
        </>
      )}
      {!isLoading && !error && !weatherData && <p>Search for a route to load weather.</p>}
    </section>
  );
};

export default WeatherCard;
