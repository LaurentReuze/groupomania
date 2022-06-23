import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import RemoveCookie from "../hooks/RemoveCookie";
import { UidContext } from "./AppContext";

const NavMenu = () => {
  let uid = useContext(UidContext);

  const handleClick = (e) => {
    RemoveCookie("Groupomania");
    uid = "";
  };

  return (
    <div className="navigation">
      <img src="./logoEntete.png" alt="logo entreprise" />
      <ul>
        <NavLink to={"/"}>
          <li>Accueil</li>
        </NavLink>
      </ul>
      <ul>
        <NavLink to={"/profil"}>
          <li>Profil</li>
        </NavLink>
      </ul>
      <ul>
        {uid ? (
          <NavLink onClick={handleClick} to={"/login"}>
            <li>Déconnexion</li>
          </NavLink>
        ) : (
          <NavLink to={"/login"}>
            <li>Se Connecter</li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default NavMenu;
