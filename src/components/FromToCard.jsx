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

    console.log(payload);

    setError("");

    if (onRouteSubmit) {
      onRouteSubmit(payload);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label>From</label>
      <input
        type="text"
        placeholder="Start Location"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <label>To</label>
      <input
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
