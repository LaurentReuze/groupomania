import React from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Actualite from "./pages/Actualite";
import Inscription from "./pages/Inscription";
import Profil from "./pages/Profil";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Actualite />} />;
      <Route path="/profil" element={<Profil />} />;
      <Route path="/login" element={<Accueil />} />;
      <Route path="/inscription" element={<Inscription />} />
      <Route path="*" element={<Accueil />} />
    </Routes>
  );
};

export default App;
