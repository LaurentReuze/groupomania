import React from "react";
import NavMenu from "../components/NavMenu";

const Profil = () => {
  return (
    <div>
      <NavMenu />
      <div className="corpsProfil">
        <div className="cadreHaut">
          <div className="partieGauche"></div>
          <div className="cercle"></div>
          <div className="partieDroite"></div>
        </div>
        <div className="cadreBas">
          <p>Dernier Post</p>
        </div>
      </div>
    </div>
  );
};

export default Profil;
