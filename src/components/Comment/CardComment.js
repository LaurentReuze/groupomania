import axios from "axios";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser } from "../../Tools/ConvDate";
import { IsAdminContext, UidContext } from "../AppContext";

const CardComment = ({ post }) => {
  const users = useSelector((state) => state.users.users);
  // const commentaire = useSelector((state) => state.commentaires.commentaires);
  const connexions = useSelector((state) => state.connexions.connexions);
  const uid = useContext(UidContext);
  const isAdmin = useContext(IsAdminContext);
  const [isUpdated, setIsUpdated] = useState(false);

  const deleteComment = async (e, id) => {
    console.log(id);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
      withCredentials: true,
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      window.location = "/";
    });
  };

  // console.log(users);
  return (
    <div className="container">
      {post.commentaires.map((commentaire) => {
        return (
          <div className="commentContainer" key={commentaire.id}>
            <div className="descriptionComment">
              {users.map((user) => {
                if (commentaire.idUSER === user.id) {
                  return (
                    <div className="identityUser" key={commentaire.id}>
                      {user.prenom} {user.nom}
                    </div>
                  );
                }
              })}
              <div className="publicationDate">
                {dateParser(commentaire.createdAt)}
              </div>
            </div>
            <div className="contenuComment">{commentaire.contenu}</div>
            <div className="iconsLine">
              {(uid === commentaire.idUSER || isAdmin) && (
                <div
                  className="iconTrash"
                  onClick={(e) => deleteComment(e, commentaire.id)}
                >
                  <img src="./img/icons/trash.svg" alt="trash" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardComment;
