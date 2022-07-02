import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import RemoveCookie from "../hooks/RemoveCookie";
import { UserContext } from "../context/userContext";

const NavMenu = () => {
  let { uidUser } = useContext(UserContext);
  // console.log(uidUser);

  const handleClick = (e) => {
    RemoveCookie("Groupomania");
    uidUser = "";
  };

  return (
    <div className="navigation">
      <img src="./logoEntete.png" alt="logo entreprise" />
      {uidUser && (
        <>
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
            <NavLink onClick={handleClick} to={"/login"}>
              <li>Déconnexion</li>
            </NavLink>
          </ul>
        </>
      )}
    </div>
  );
};

export default NavMenu;
