import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <div className="navigation">
        <ul>
          <NavLink
            to="/Connection"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Connexion</li>
          </NavLink>
          <NavLink
            to="/Inscription"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Inscription</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
