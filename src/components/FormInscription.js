import React from "react";

const FormInscription = () => {
  return (
    <div className="corpsInscription">
      <div className="blocInscription">
        <div>
          <span>Nom :</span>
          <input type="text" placeholder="Saisir votre nom" />
        </div>
        <div>
          <span>Prénom :</span>
          <input type="text" placeholder="Saisir votre prénom" />
        </div>
        <div>
          <span>Email :</span>
          <input type="text" placeholder="Saisir votre email" />
        </div>
        <div>
          <span>Mot de passe :</span>
          <input type="password" placeholder="Saisir votre mot de passe" />
        </div>
        <div>
          <span>Confirmer votre mot de passe :</span>
          <input type="password" placeholder="Confirmer votre password" />
        </div>
        <button>Envoyer</button>
      </div>
    </div>
  );
};

export default FormInscription;
