import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Actualite from "./pages/Actualite";
import Inscription from "./pages/Inscription";
import MdpOublie from "./pages/MdpOublie";
import Profil from "./pages/Profil";
import { UidContext } from "./components/AppContext";
import axios from "axios";

const App = () => {
  const [uid, setUid] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // La fonction de controle du token se lance dès le début du programme avec useEffect
  useEffect(() => {
    const controleToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/auth/cookie`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data.userObj);
          setUid(res.data.userObj.userId);
          setIsAdmin(res.data.userObj.isAdmin);
          console.log({ uid });
          console.log({ isAdmin });
        })
        .catch((err) => console.log(err));
    };
    controleToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Actualite />} />;
          <Route path="/profil" element={<Profil />} />;
          <Route path="/login" element={<Accueil />} />;
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/forgot" element={<MdpOublie />} />
          <Route path="*" element={<Accueil />} />
        </Routes>
      </BrowserRouter>
    </UidContext.Provider>
  );
};

export default App;
