import React, { useContext, useEffect } from "react";
import NavMenu from "../components/NavMenu";
import { UidContext } from "../components/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

// ########################## Component SlideShow ############################
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import { setUsersData } from "../feature/usersSlice";
import { dateParser } from "../Tools/ConvDate";

const Profil = () => {
  const uid = useContext(UidContext);
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.posts.posts);
  const [isUpdated, setIsUpdated] = useState(false);
  const [prenomUpdate, setPrenomUpdate] = useState();
  const [nomUpdate, setNomUpdate] = useState();
  const [emailUpdate, setEmailUpdate] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/`,
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data);
      dispatch(setUsersData(res.data));
    });
  }, []);

  // #################### Upload des modifications identité user ####################
  const uploadUpdate = async () => {
    users.map((user) => {
      if (uid === user.id) {
        axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}api/auth/${user.id}`,
          withCredentials: true,
          headers: { "Content-type": "application/json" },
          data: {
            prenom: prenomUpdate,
            nom: nomUpdate,
            email: emailUpdate,
          },
        })
          .then((res) => {
            console.log("#################");
            console.log("Update terminée");
            console.log("#################");
            setIsUpdated(false);
            window.location = "/profil";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // #################### Rendu visuel ####################
  return (
    <div className="profil-page">
      <NavMenu />
      {uid ? (
        <div className="corpsProfil">
          {users.map((user) => {
            if (uid === user.id) {
              return (
                <div className="cadreHaut" key={user.id}>
                  <div className="partieGauche"></div>
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
              );
            }
          })}
          {/* // ################# Affichage du SlideShow/Carousel ################# */}
          <div className="cadreBas">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {posts.map((post) => {
                if (uid === post.idUSER) {
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
        (window.location = "/login")
      )}
    </div>
  );
};

export default Profil;
