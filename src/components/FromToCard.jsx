import { useState } from "react";

const FromToCard = ({ onRouteSubmit }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from.trim() || !to.trim()) {
      setError("Please enter both starting location and destination.");
      return;
    }

    const payload = { from: from.trim(), to: to.trim() };

    setError("");
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
        onChange={(e) => setFrom(e.target.value)}
      />

      <label htmlFor="to">To</label>
      <input
        id="to"
        name="to"
        type="text"
        placeholder="Destination"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}

      <button className="primary-btn" type="submit">
        Search Route
      </button>
    </form>
  );
};

export default FromToCard;
