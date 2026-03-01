import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
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
        <div className="navbar__profile" />
      </div>
    </nav>
  );
};

export default Navbar;
