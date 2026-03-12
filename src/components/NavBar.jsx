import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ user, onLogin, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

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

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__brand">
          <img
            src={logo}
            alt="Byte The Commute Logo"
            className="navbar__logo"
          />

          <NavLink to="/" className="navbar__title">
            Byte The Commute
          </NavLink>
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

              {authError && <span className="navbar__error">{authError}</span>}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
