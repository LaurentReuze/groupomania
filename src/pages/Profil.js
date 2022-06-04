import React, { useContext } from "react";
import NavMenu from "../components/NavMenu";
import { UidContext } from "../components/AppContext";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      <NavMenu />
      {uid ? (
        <div className="corpsProfil">
          <div className="cadreHaut">
            <div className="partieGauche"></div>
            <div className="cercle"></div>
            <div className="partieDroite"></div>
          </div>
          <div className="cadreBas"></div>
          <p>Dernier Post</p>
        </div>
      ) : (
        (window.location = "/login")
      )}
    </div>
  );
};

export default Profil;
