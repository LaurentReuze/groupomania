import React from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <div className="navigation">
      <img src="./logoEntete.png" alt="logo entreprise" />
      <ul>
        <NavLink to={"/actualite"}>
          <li>Accueil</li>
        </NavLink>
      </ul>
      <ul>
        <NavLink to={"/profil"}>
          <li>Profil</li>
        </NavLink>
      </ul>
      <ul>
        <NavLink to={"/"}>
          <li>Se Connecter</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavMenu;
