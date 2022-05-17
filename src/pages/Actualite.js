import React, { useContext } from "react";
import BlocActualite from "../components/BlocActualite";
import BlocTendance from "../components/BlocTendance";
import BlocUtilisateur from "../components/BlocUtilisateur";
import NavMenu from "../components/NavMenu";
import { UidContext } from "../components/AppContext";

const Actualite = () => {
  // console.log(window.location);

  return (
    <div>
      <NavMenu />
      <div className="corpsActualite">
        <div className="partieGauche">
          <h4>Liste des utilisateurs</h4>
          <BlocUtilisateur />
        </div>
        <div className="partieCentre">
          <h4>Fils d'Actualite</h4>
          <BlocActualite />
        </div>
        <div className="partieDroite">
          <div className="tendance">
            <h4>Tendance</h4>
            <BlocTendance />
          </div>
          <div className="suggestion">
            <h4>Suggestion</h4>
            <BlocUtilisateur />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actualite;
