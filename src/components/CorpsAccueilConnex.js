import React from "react";
import Connexion from "./Connexion";
import Description from "./Description";

const CorpsAccueilConnex = () => {
  return (
    <div className="corps">
      <div className="partieGauche">
        <h2>Lorem, ipsum.</h2>
        <Description />
      </div>
      <div className="partieDroite">
        <h2>Connexion</h2>
        <Connexion />
      </div>
    </div>
  );
};

export default CorpsAccueilConnex;
