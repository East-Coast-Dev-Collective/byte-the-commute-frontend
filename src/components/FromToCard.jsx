import { useState } from "react";

const FromToCard = ({ onRouteSubmit, isLoading = false, error = "" }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from.trim() || !to.trim()) {
      setValidationError("Please enter both starting location and destination.");
      return;
    }

    const payload = { from: from.trim(), to: to.trim() };

    setValidationError("");
    onRouteSubmit(payload);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label htmlFor="from">From</label>
      <input
        id="from"
        name="from"
        type="text"
        placeholder="Start Location"
        value={from}
        disabled={isLoading}
        onChange={(e) => setFrom(e.target.value)}
      />

      <label htmlFor="to">To</label>
      <input
        id="to"
        name="to"
        type="text"
        placeholder="Destination"
        value={to}
        disabled={isLoading}
        onChange={(e) => setTo(e.target.value)}
      />

      {validationError && <p className="error-text">{validationError}</p>}
      {!validationError && error && <p className="error-text">{error}</p>}

      <button className="primary-btn" type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search Route"}
      </button>
    </form>
  );
};

export default FromToCard;
