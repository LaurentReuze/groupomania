import axios from "axios";
import React, { useState } from "react";

// Récupération des différents champ du formulaire
const FormInscription = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
      withCredentials: true,
      data: {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
      },
    }).then((res) => {});
  };

  return (
    <div className="corpsInscription">
      <div className="blocInscription">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="nom">Nom :</label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="Saisir votre nom"
              onChange={(e) => setNom(e.target.value)}
              value={nom}
            />
          </div>
          <div className="validatorNom"></div>
          <div>
            <label htmlFor="prenom">Prénom :</label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Saisir votre prénom"
              onChange={(e) => setPrenom(e.target.value)}
              value={prenom}
            />
          </div>
          <div className="validatorPrenom"></div>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              name="email"
              placeholder="Saisir votre email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Saisir votre mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="validatorPassword"></div>
          <div>
            <label htmlFor="confirmPassword">
              Confirmer votre mot de passe :
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmer votre password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="validatorPassword"></div>
          <div className="submit">
            <input type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInscription;
