import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Actualite from "./pages/Actualite";
import Inscription from "./pages/Inscription";
import MdpOublie from "./pages/MdpOublie";
import Profil from "./pages/Profil";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />;
        <Route path="/profil" element={<Profil />} />;
        <Route path="/actualite" element={<Actualite />} />;
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/forgot" element={<MdpOublie />} />
        <Route path="*" element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
