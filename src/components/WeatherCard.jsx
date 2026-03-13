const WeatherCard = ({ weatherData, error }) => {
  return (
    <section className="card weather-card">
      <div className="card__head">
        <h3>Destination Weather</h3>
      </div>
      {error && <p className="error-text">{error}</p>}
      {!error && weatherData && (
        <div className="weather-grid">
          <p className="weather-temp">{weatherData.temperature ?? "N/A"} F</p>
          <p className="weather-condition">{weatherData.condition ?? "N/A"}</p>
          {weatherData.icon && (
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.condition ?? "Weather icon"}
              width="64"
              height="64"
            />
          )}
        </div>
      )}
      {!error && !weatherData && (
        <p className="empty-text">Search for a route to load weather.</p>
      )}
    </section>
  );
};

export default WeatherCard;
