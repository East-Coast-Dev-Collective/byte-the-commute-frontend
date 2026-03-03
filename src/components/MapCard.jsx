const MapCard = ({ routeData, isLoading, error }) => {
  return (
    <section>
      <h3>Route</h3>
      {isLoading && <p>Loading route...</p>}
      {!isLoading && error && <p className="error-text">{error}</p>}
      {!isLoading && !error && routeData && (
        <>
          <p>
            {routeData.from} to {routeData.to}
          </p>
          <p>Mode: {routeData.mode}</p>
          <p>Distance: {routeData.distanceText ?? "N/A"}</p>
          <p>Duration: {routeData.durationText ?? "N/A"}</p>
        </>
      )}
      {!isLoading && !error && !routeData && <p>Search for a route to begin.</p>}
    </section>
  );
};

export default MapCard;
