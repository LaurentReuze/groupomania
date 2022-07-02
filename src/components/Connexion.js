import React, { useState, useContext } from "react";
import { useRef } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { signIn, uidUser, decodeToken } = useContext(UserContext);

  const navigate = useNavigate();

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector(".validatorEmail").innerHTML = "";
    document.querySelector(".validatorPassword").innerHTML = "";

    try {
      await signIn(email, password);
      // console.log(email);
      // console.log(password);
      // await decodeToken();
      // console.log(uidUser);
      formRef.current.reset();
      navigate("/");
    } catch (err) {
      // console.log(err);
      navigate("/login");
    }
  };

  return (
    <div className="connexion">
      <div className="coprsConnexion">
        <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Saisir votre email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="validatorEmail"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Saisir votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="validatorPassword"></div>
          <br />
          <button>Envoyer</button>
        </form>
        <br />
        <div className="nouveauCompte">
          <a href="/inscription"> Nouveau Compte</a>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
