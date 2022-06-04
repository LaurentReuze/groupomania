import React, { useContext } from "react";
import NavMenu from "../components/NavMenu";
import { UidContext } from "../components/AppContext";
import NouveauPost from "../components/NouveauPost";
import Thread from "../components/Thread";

const Actualite = () => {
  console.log("####");
  console.log(UidContext);

  const uid = useContext(UidContext);
  console.log(uid);

  return (
    <div>
      <NavMenu />
      <Thread />
      <div className="filsActualite">
        <h2>Exprimez-vous !</h2>
        <NouveauPost />
      </div>
    </div>
  );
};

export default Actualite;
