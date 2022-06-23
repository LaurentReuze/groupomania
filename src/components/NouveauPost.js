import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setConnexionsData } from "../feature/connexionSlice";
import { IsAdminContext, UidContext } from "./AppContext";

const NouveauPost = () => {
  const [titrePost, setTitrePost] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [corpMessage, setCorpMessage] = useState("");
  const [image, setImage] = useState("gfdq");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/cookie`,
      withCredentials: true,
    }).then((res) => {
      dispatch(setConnexionsData(res.data));
      setIsUpdated(true);
    });
  }, [isUpdated]);

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
        idUSER: uid,
      },
    })
      .then((res) => {
        setIsUpdated(false);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="blocNewPost">
      <form onSubmit={(e) => handleSubmit(e)}>
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