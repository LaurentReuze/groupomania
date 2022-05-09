import React from "react";

const Forget = () => {
  return (
    <div className="corpsForget">
      <div className="blocForget">
        <h1>Récupération de mot de passe</h1>
        <span>Merci de saisir votre email :</span>
        <input type="text" placeholder="Saisir votre email" />
        <button>Soumettre</button>
      </div>
    </div>
  );
};

export default Forget;
