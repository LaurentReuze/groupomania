import axios from "axios";
import React, { useState } from "react";
import SetCookie from "../hooks/SetCookie";

// Récupération des différents champ du formulaire
const FormInscription = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("###################################");
    // console.log(photo);
    console.log("###################################");

    document.querySelector(".validatorEmail").innerHTML = "";
    document.querySelector(".validatorPassword").innerHTML = "";
    document.querySelector(".validatorNom").innerHTML = "";
    document.querySelector(".validatorPrenom").innerHTML = "";
    document.querySelector(".IdemPassword").innerHTML = "";

    if (password === confirmPassword) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        withCredentials: true,
        headers: { "Content-type": "multipart/form-data" },
        data: {
          nom: nom,
          prenom: prenom,
          email: email,
          password: password,
          photo: photo,
        },
      })
        .then((res) => {
          SetCookie("Groupomania", res.data.token);
          window.location = "/";
        })
        .catch((err) => {
          if (err.response.data.errorIdemAdress) {
            document.querySelector(".validatorEmail").innerHTML =
              err.response.data.errorIdemAdress;
          }
        });
    } else {
      document.querySelector(".validatorPassword").innerHTML =
        "Les mots de passe saisie ne correspondent pas";
      document.querySelector(".IdemPassword").innerHTML =
        "Les mots de passe saisie ne correspondent pas";
    }
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
          {/* Cette div va permettre de mettre l'erreur du backend si nécéssaire */}
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
          {/* Cette div va permettre de mettre l'erreur du backend si nécéssaire */}
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
          {/* Cette div va permettre de mettre l'erreur du backend si nécéssaire */}
          <div className="validatorEmail"></div>
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
          {/* Cette div va permettre de mettre l'erreur du backend si nécéssaire */}
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
          <div className="IdemPassword"></div>
          <div>
            <label htmlFor="photo">Photo d'identité</label>
            <input
              type="file"
              name="photo"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
          </div>
          <div className="submit">
            <input type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInscription;
