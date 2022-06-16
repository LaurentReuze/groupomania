import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Actualite from "./pages/Actualite";
import Inscription from "./pages/Inscription";
import MdpOublie from "./pages/MdpOublie";
import Profil from "./pages/Profil";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setConnexionsData } from "./feature/connexionSlice";

const App = () => {
  // -------------- Contrôle de la présence d'un cookie ----------------

  const dispatch = useDispatch();
  // const uid = useSelector((state) => state.connexions.connexions.userId)
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
          dispatch(setConnexionsData(res.data.userObj));
          setUid(res.data.userObj.userId);
          setIsAdmin(res.data.userObj.isAdmin);
        })
        .catch((err) => {
          // if (window.location.pathname !== "/login") {
          //   window.location = "/login";
          // }
        });
      // console.log(uid);
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
