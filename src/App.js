import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Actualite from "./pages/Actualite";
import Inscription from "./pages/Inscription";
import Profil from "./pages/Profil";
import { UidContext, IsAdminContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setConnexionsData } from "./feature/connexionSlice";

const App = () => {
  // -------------- Contrôle de la présence d'un cookie ----------------

  const dispatch = useDispatch();
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
          console.log(err.response.data);
          // if ((window.location.pathname === "/login") || (window.location.pathname === "/inscription")) {
          //   window.location = "/login";
          // }
          if (window.location.pathname !== "/login") {
            window.location = "/login";
          }
        });
    };
    controleToken();
  }, [uid, isAdmin]);

  return (
    <UidContext.Provider value={uid}>
      <IsAdminContext.Provider value={isAdmin}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Actualite />} />;
            <Route path="/profil" element={<Profil />} />;
            <Route path="/login" element={<Accueil />} />;
            <Route path="/inscription" element={<Inscription />} />
            <Route path="*" element={<Accueil />} />
          </Routes>
        </BrowserRouter>
      </IsAdminContext.Provider>
    </UidContext.Provider>
  );
};

export default App;
