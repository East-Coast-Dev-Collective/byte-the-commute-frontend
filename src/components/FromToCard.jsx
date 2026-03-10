import { useState } from "react";

const FromToCard = ({ onRouteSubmit, isLoading = false, error = "" }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mode, setMode] = useState("drive");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from.trim() || !to.trim()) {
      setValidationError(
        "Please enter both starting location and destination.",
      );
      return;
    }

    const payload = { from: from.trim(), to: to.trim(), mode };

    setValidationError("");
    onRouteSubmit(payload);
  };

  const modes = [
    { key: "drive", label: "Drive" },
    { key: "transit", label: "Transit" },
    { key: "walk", label: "Walk" },
    { key: "bike", label: "Bike" },
  ];

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label>From</label>
      <input
        type="text"
        placeholder="Start Location"
        value={from}
        disabled={isLoading}
        onChange={(e) => setFrom(e.target.value)}
      />

      <label>To</label>
      <input
        type="text"
        placeholder="Destination"
        value={to}
        disabled={isLoading}
        onChange={(e) => setTo(e.target.value)}
      />

      {/* Mode Selector */}
      <div className="mode-row" aria-label="Transport mode">
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            className={mode === m.key ? "mode-btn active" : "mode-btn"}
            onClick={() => setMode(m.key)}
            disabled={isLoading}
            aria-pressed={mode === m.key}
          >
            {m.label}
          </button>
        ))}
      </div>

      {validationError && <p className="error-text">{validationError}</p>}
      {!validationError && error && <p className="error-text">{error}</p>}

      <button className="primary-btn" type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search Route"}
      </button>
    </form>
  );
};

export default FromToCard;
