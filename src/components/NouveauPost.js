import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const NouveauPost = () => {
  const [titrePost, setTitrePost] = useState("");
  const [corpMessage, setCorpMessage] = useState("");
  const [image, setImage] = useState("gfdq");
  let { uidUser, postIsLoading } = useContext(UserContext);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
      data: {
        titre: titrePost,
        contenu: corpMessage,
        photo: image,
        idUSER: uidUser,
      },
    })
      .then((res) => {
        formRef.current.reset();
        // postIsLoading = false;
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="blocNewPost">
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="titrePost">Titre</label>
        <input
          className="titrePost"
          type="text"
          name="titrePost"
          id="titrePost"
          required
          onChange={(e) => setTitrePost(e.target.value)}
        />
        <div className="errorTitre"></div>
        <label htmlFor="contenuPost">Message</label>
        <textarea
          name="contenuPost"
          id="contenuPost"
          cols="30"
          rows="4"
          required
          onChange={(e) => setCorpMessage(e.target.value)}
        ></textarea>
        <div className="errorContenuPost"></div>
        <div className="lastline">
          <input
            className="photoPost"
            type="file"
            name="photo"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input className="btnSend" type="submit" value={"Envoyer"} />
        </div>
      </form>
    </div>
  );
};

export default NouveauPost;
