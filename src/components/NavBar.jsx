import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { logoTickerItems } from "../data/logoTickerItems";

const Navbar = ({ onHomeClick }) => {
  const scrollingItems = [...logoTickerItems, ...logoTickerItems];

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

      <NavLink
        to="/"
        className="navbar__brand"
        aria-label="Byte The Commute home"
        onClick={onHomeClick}
      >
        <img src={logo} alt="Byte The Commute Logo" className="navbar__logo" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
