import React from "react";
import CorpsAccueilConnex from "../components/CorpsAccueilConnex";
import NavMenu from "../components/NavMenu";
import Titre from "../components/Titre";

const Accueil = () => {
  return (
    <div>
      <NavMenu />
      <Titre />
      <CorpsAccueilConnex />
    </div>
  );
};

export default Accueil;
