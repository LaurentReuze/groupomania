import React from "react";

const Connexion = () => {
  return (
    <div className="connexion">
      <div className="coprsConnexion">
        <span>Email</span>
        <input type="text" placeholder="Saisir votre email" />
        <span>Mot de Passe</span>
        <input type="password" placeholder="Saisir votre mot de passe" />
        <div className="forgotConnexion">
          <a href="/forgot">Mot de passe oublié</a>
          <button>Connexion</button>
        </div>
        <div className="nouveauCompte">
          <a href="/inscription">Nouveau Compte</a>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
