import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { logoTickerItems } from "../data/logoTickerItems";

const Navbar = ({ user, onLogin, onRegister, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const scrollingItems = [...logoTickerItems, ...logoTickerItems];

  const handleLoginClick = () => {
    if (!username.trim() || !password.trim()) {
      setAuthError("Please enter both username and password.");
      return;
    }

    setAuthError("");
    onLogin({
      username,
      password,
    });
    setUsername("");
    setPassword("");
  };

  const handleRegisterClick = () => {
    if (!username.trim() || !password.trim()) {
      setAuthError("Please enter both username and password.");
      return;
    }
    setAuthError("");
    onRegister({
      username,
      password,
    });
    setUsername("");
    setPassword("");
  };

  return (
    <nav className="navbar">
      <div className="navbar__ticker" aria-hidden="true">
        <div className="ticker-track">
          {scrollingItems.map((item, idx) => (
            <span className="ticker-item" key={`${item.label}-${idx}`}>
              <img src={item.src} alt="" loading="lazy" />
              <span>{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="navbar__right">
        <div className="navbar__profile">
          {user ? (
            <>
              <span className="navbar__status">Welcome, {user.name}</span>
              <button
                className="navbar__btn"
                onClick={() => {
                  setAuthError("");
                  onLogout();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <span className="navbar__status">Guest</span>

              <input
                type="text"
                placeholder="Username"
                className="navbar__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="navbar__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="navbar__btn" onClick={handleLoginClick}>
                Login
              </button>

              <button className="navbar__btn" onClick={handleRegisterClick}>
                Register
              </button>

              {authError && <span className="navbar__error">{authError}</span>}
            </>
          )}
        </div>
      </div>
      <NavLink
        to="/"
        className="navbar__brand"
        aria-label="Byte The Commute home"
      >
        <img src={logo} alt="Byte The Commute Logo" className="navbar__logo" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
