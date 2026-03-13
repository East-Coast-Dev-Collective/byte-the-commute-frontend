import { useState } from "react";

const AuthCard = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const buildPayload = () => {
    if (!username.trim() || !password.trim()) {
      setAuthError("Please enter both username and password.");
      return null;
    }

    setAuthError("");
    return {
      username: username.trim(),
      password: password.trim(),
    };
  };

  const handleLogin = () => {
    const payload = buildPayload();
    if (!payload) return;
    onLogin(payload);
    setUsername("");
    setPassword("");
  };

  const handleRegister = () => {
    const payload = buildPayload();
    if (!payload) return;
    onRegister(payload);
    setUsername("");
    setPassword("");
  };

  return (
    <section className="card auth-card">
      <div className="card__head">
        <h3>Account</h3>
        <p>Save your commute preferences.</p>
      </div>

      <label htmlFor="auth-username">Username</label>
      <input
        id="auth-username"
        type="text"
        className="input-field"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="auth-password">Password</label>
      <input
        id="auth-password"
        type="password"
        className="input-field"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="auth-card__actions">
        <button type="button" className="primary-btn" onClick={handleLogin}>
          Login
        </button>
        <button
          type="button"
          className="primary-btn primary-btn--secondary"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>

      {authError && <p className="error-text">{authError}</p>}
    </section>
  );
};

export default AuthCard;
