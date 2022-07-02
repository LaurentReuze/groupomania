import React, { useContext, useEffect, useState } from "react";
import NavMenu from "../components/NavMenu";
import axios from "axios";

// ########################## Component SlideShow ############################
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import { dateParser } from "../Tools/ConvDate";
import { UserContext } from "../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";

const Profil = () => {
  const { uidUser, isAdmin } = useContext(UserContext);
  const [isUpdated, setIsUpdated] = useState(false);
  const [prenomUpdate, setPrenomUpdate] = useState();
  const [nomUpdate, setNomUpdate] = useState();
  const [emailUpdate, setEmailUpdate] = useState();
  const [photoUpdate, setPhotoUpdate] = useState();
  const [user, setUser] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!uidUser) {
      <Navigate to="/login" />;
    }
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/${uidUser}`,
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data);
      setUser(res.data);

      // dispatch(setUsersData(res.data));
    });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/profil/${uidUser}`,
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data);
      setUserPost(res.data);
    });
  }, []);

  // #################### Upload des modifications identité user ####################
  const uploadUpdate = async () => {
    console.log(photoUpdate);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/auth/${user.id}`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
      data: {
        prenom: prenomUpdate,
        nom: nomUpdate,
        email: emailUpdate,
        photo: photoUpdate,
      },
    })
      .then((res) => {
        console.log("#################");
        console.log("Update terminée");
        console.log("#################");
        setIsUpdated(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // #################### Rendu visuel ####################
  return (
    <div className="profil-page">
      <NavMenu />
      {user ? (
        <div className="corpsProfil">
          <div className="cadreHaut">
            <div className="partieGauche">
              {isUpdated && (
                <div className="modifPhoto">
                  <label htmlFor="photo">Changement de la Photo</label>
                  <img
                    src={user.photo}
                    alt="photo d'identité"
                    className="photoIdentité"
                  />
                  <input
                    type="file"
                    name="photo"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => setPhotoUpdate(e.target.files[0])}
                    required
                  />
                </div>
              )}
            </div>
            <div className="cercle">
              <img
                src={user.photo}
                alt="photo d'identité"
                className="photoIdentité"
              />
            </div>
            <div className="partieDroite">
              {isUpdated === false && (
                <div className="identiteContainer">
                  <div className="identite">
                    {user.prenom} {user.nom}
                  </div>
                  <div className="email">{user.email}</div>
                </div>
              )}
              {isUpdated && (
                <div className="modifContainer">
                  <div className="identiteContainer">
                    <div className="modifPrenom">
                      <div className="descriptif">Prénom :</div>
                      <input
                        type="text"
                        defaultValue={user.prenom}
                        onChange={(e) => setPrenomUpdate(e.target.value)}
                      />
                    </div>
                    <div className="modifNom">
                      <div className="descriptif">Nom :</div>
                      <input
                        type="text"
                        defaultValue={user.nom}
                        onChange={(e) => setNomUpdate(e.target.value)}
                      />
                    </div>
                    <div className="modifEmail">
                      <div className="descriptif">Email :</div>
                      <input
                        type="text"
                        defaultValue={user.email}
                        onChange={(e) => setEmailUpdate(e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="btnUpdate" onClick={uploadUpdate}>
                    Enregistrer
                  </button>
                </div>
              )}
              <div
                className="iconEdit"
                onClick={() => setIsUpdated(!isUpdated)}
              >
                <img src="./img/icons/edit.svg" alt="edit" />
              </div>
            </div>
          </div>
          <div className="cadreBas">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {userPost.map((post) => {
                if (uidUser === post.idUSER) {
                  return (
                    <SwiperSlide key={post.id}>
                      <div className="postContainer">
                        <div className="dateContainer">
                          <div className="descriptif">Publié le :</div>
                          <div className="date" key={post.id}></div>
                          {dateParser(post.createdAt)}
                        </div>
                        <div className="titreContainer">
                          <div className="descriptif">Titre :</div>
                          <div className="titre">{post.titre}</div>
                        </div>
                        <div className="messageContainer">
                          <div className="descriptif">Message :</div>
                          <div className="message">" {post.contenu} "</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default Profil;
