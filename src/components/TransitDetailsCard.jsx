const TransitDetailsCard = ({ mode, transitSteps, isLoading, error }) => {
  const isTransit = mode === "transit";
  const hasSteps = Array.isArray(transitSteps) && transitSteps.length > 0;

  return (
    <section className="card transit-card">
      <div className="card__head">
        <h3>Transit Details</h3>
        <p>Step-by-step itinerary for transit routes.</p>
      </div>

      {isLoading && <p className="empty-text">Loading transit details...</p>}
      {!isLoading && error && <p className="error-text">{error}</p>}

      {!isLoading && !error && !isTransit && (
        <p className="empty-text">
          Transit details appear when Transit mode is selected.
        </p>
      )}

      {!isLoading && !error && isTransit && !hasSteps && (
        <p className="empty-text">No transit details available.</p>
      )}

      {!isLoading && !error && isTransit && hasSteps && (
        <ol className="transit-steps">
          {transitSteps.map((step, index) => {
            const mode = String(step.travelMode ?? "").toLowerCase();
            const isWalking = mode === "walk" || mode === "walking";
            const instruction = String(
              step.instruction || "No instruction available.",
            ).replace(/<[^>]*>/g, "");

            return (
              <li
                key={step.id ?? index}
                className={`transit-step ${isWalking ? "walk" : "ride"}`}
              >
                <div className="transit-step__top">
                  <span className="transit-step__index">{index + 1}</span>
                  <span className="transit-step__mode">
                    {isWalking ? "Walk" : "Transit"}
                  </span>
                </div>
                <p className="transit-step__instruction">{instruction}</p>

                {isWalking ? (
                  <div className="transit-step__meta">
                    <p>
                      <span>Distance</span>
                      {step.distanceText ?? "N/A"}
                    </p>
                    <p>
                      <span>Duration</span>
                      {step.durationText ?? "N/A"}
                    </p>
                  </div>
                ) : (
                  <div className="transit-step__meta">
                    <p>
                      <span>Line</span>
                      {step.line ?? "N/A"}
                    </p>
                    <p>
                      <span>Agency</span>
                      {step.agency ?? "N/A"}
                    </p>
                    <p>
                      <span>Headsign</span>
                      {step.headsign ?? "N/A"}
                    </p>
                    <p>
                      <span>Stops</span>
                      {step.numStops ?? "N/A"}
                    </p>
                    <p>
                      <span>Departure</span>
                      {step.departureTime ?? "N/A"}
                    </p>
                    <p>
                      <span>Arrival</span>
                      {step.arrivalTime ?? "N/A"}
                    </p>
                  </div>
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
