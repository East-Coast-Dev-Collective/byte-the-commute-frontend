const TransitDetailsCard = ({ mode, transitSteps, isLoading, error }) => {
  const isTransit = mode === "transit";
  const hasSteps = Array.isArray(transitSteps) && transitSteps.length > 0;

  return (
    <section>
      <h3>Transit Details</h3>

      {isLoading && <p>Loading transit details...</p>}
      {!isLoading && error && <p className="error-text">{error}</p>}

      {!isLoading && !error && !isTransit && (
        <p>Transit details appear when Transit mode is selected.</p>
      )}

      {!isLoading && !error && isTransit && !hasSteps && (
        <p>No transit details available.</p>
      )}

      {!isLoading && !error && isTransit && hasSteps && (
        <ol className="transit-steps">
          {transitSteps.map((step, index) => {
            const isWalking = step.travelMode === "walk";

            return (
              <li
                key={step.id ?? index}
                className={`transit-step ${isWalking ? "walk" : "ride"}`}
              >
                <p>
                  <strong>
                    {index + 1}. {isWalking ? "Walk" : "Transit"}
                  </strong>
                </p>
                <p>{step.instruction || "No instruction available."}</p>

                {isWalking ? (
                  <p>Distance: {step.distanceText ?? "N/A"}</p>
                ) : (
                  <>
                    <p>Line: {step.line ?? "N/A"}</p>
                    <p>Agency: {step.agency ?? "N/A"}</p>
                    <p>Headsign: {step.headsign ?? "N/A"}</p>
                    <p>Stops: {step.numStops ?? "N/A"}</p>
                    <p>Departure: {step.departureTime ?? "N/A"}</p>
                    <p>Arrival: {step.arrivalTime ?? "N/A"}</p>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
};

export default TransitDetailsCard;
