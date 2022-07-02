import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import NouveauPost from "../components/NouveauPost";
import Thread from "../components/Thread";
import { UserContext } from "../context/userContext";

const Actualite = () => {
  const { uidUser, decodeToken } = useContext(UserContext);
  const [isUpdated, setIsUpdated] = useState(false);

  // console.log(uidUser);

  useEffect(() => {
    if (!uidUser) {
      <Navigate to="/login" />;
    } else {
      decodeToken();
    }
  }, [uidUser]);

  return (
    <>
      <NavMenu />
      {uidUser && (
        <div>
          <h1>Fil d'Actualité</h1>
          <div className="filsActualite">
            <h2>Exprimez-vous !</h2>
            <NouveauPost />
            <Thread />
          </div>
        </div>
      )}
    </>
  );
};

export default Actualite;
