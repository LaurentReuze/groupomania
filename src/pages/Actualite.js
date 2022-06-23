import React, { useContext, useEffect } from "react";
import { UidContext } from "../components/AppContext";
import NavMenu from "../components/NavMenu";
import NouveauPost from "../components/NouveauPost";
import Thread from "../components/Thread";

const Actualite = () => {
  const uid = useContext(UidContext);

  useEffect(() => {
    if (uid === null) {
      window.location = "/login";
    }
  });

  return (
    <div>
      <NavMenu />
      <h1>Fil d'Actualité</h1>
      <div className="filsActualite">
        <h2>Exprimez-vous !</h2>
        <NouveauPost />
        <Thread />
      </div>
    </div>
  );
};

export default Actualite;
