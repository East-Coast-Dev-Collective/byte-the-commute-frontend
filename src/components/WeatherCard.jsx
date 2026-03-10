const WeatherCard = ({ weatherData, error }) => {
  return (
    <section>
      <h3>Weather</h3>
      {error && <p className="error-text">{error}</p>}
      {!error && weatherData && (
        <>
          <p>Temperature: {weatherData.temperature ?? "N/A"} F</p>
          <p>Condition: {weatherData.condition ?? "N/A"}</p>
          {weatherData.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.condition ?? "Weather icon"}
              width="64"
              height="64"
            />
          )}
        </>
      )}
      {!error && !weatherData && <p>Search for a route to load weather.</p>}
    </section>
  );
};

export default WeatherCard;
