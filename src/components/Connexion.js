import axios from "axios";
import React, { useState } from "react";
import SetCookie from "../hooks/SetCookie";
import RemoveCookie from "../hooks/RemoveCookie";

const Connexion = () => {
  // Constante email et password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // Ne recharge pas la page
    e.preventDefault();
    document.querySelector(".validatorEmail").innerHTML = "";
    document.querySelector(".validatorPassword").innerHTML = "";

    // Axios exactement comme fetch. Enchange avec l'API
    axios({
      // method d'envoi à l'API
      method: "post",
      // adresse de l'API - REACT_APP_API_URL est une variable d'environnement
      // Elle permet de pouvoir changer facilement une seule fois l'adresse au lieu d'aller
      // partout dans le code pour changer l'adresse
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        RemoveCookie("Groupomania");
        console.log(res.data.token);
        SetCookie("Groupomania", res.data.token);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);

        const tabErreur = err.response.data;

        for (let index = 0; index < tabErreur.length; index++) {
          const messageErreur = tabErreur[index].message;
          const champ = tabErreur[index].context.label;
          if (champ === "email") {
            document.querySelector(".validatorEmail").innerHTML = messageErreur;
          }
          if (champ === "password") {
            document.querySelector(".validatorPassword").innerHTML =
              messageErreur;
          }
        }
      });
  };

  return (
    <div className="connexion">
      <div className="coprsConnexion">
        {/* ----------------- Début formulaire --------------------- */}
        {/* onSubmit signifie à l'envoi du formulaire, on execute la fonction handleSubmit */}
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* Champ Email */}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Saisir votre email"
            // onChange signifie au changment du champ on stocke la valeur dans la constante setEmail
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* Cette div va permettre de mettre l'erreur du backend si nécéssaire */}
          <div className="validatorEmail"></div>
          <br />
          {/* Champ Mot de passe */}
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Saisir votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* Cette div va permettre de mettre l'erreur du backend si nécéssaire */}
          <div className="validatorPassword"></div>
          <br />
          {/* Bouton Connexion et lien mdp oublié*/}
          <div className="forgotConnexion">
            <a href="/forgot">Mot de passe oublié</a>
            <input type="submit" value="Connexion" />
          </div>
        </form>
        <br />
        {/* Lien Nouveau Compte */}
        <div className="nouveauCompte">
          <a href="/inscription">Nouveau Compte</a>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
