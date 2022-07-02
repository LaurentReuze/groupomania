import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { dateParser } from "../../Tools/ConvDate";
import { UserContext } from "../../context/userContext";

const CardComment = ({ post }) => {
  const { isAdmin, uidUSER } = useContext(UserContext);
  const [userComment, setUserComment] = useState();
  const [loadComment, setLoadComment] = useState(false);

  const RecupUserComment = (commentaire) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/${commentaire.idUSER}`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    }).then((res) => {
      console.log(res);
      // setLoadComment(true);
      setUserComment(res.data);
      // console.log(userComment);
    });
  };

  const deleteComment = async (e, id) => {
    console.log(id);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
      withCredentials: true,
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      setLoadComment(true);

      window.location.reload();
    });
  };

  // console.log(users);
  return (
    <div className="container">
      {post.commentaires.map((commentaire) => {
        console.log(commentaire);
        return (
          <div className="commentContainer" key={commentaire.id}>
            <div className="descriptionComment">
              <div className="identityUser" key={commentaire.id}>
                {commentaire.user.prenom} {commentaire.user.nom}
              </div>
              <div className="publicationDate">
                {dateParser(commentaire.createdAt)}
              </div>
            </div>
            <div className="contenuComment">{commentaire.contenu}</div>
            <div className="iconsLine">
              {(uidUSER === commentaire.idUSER || isAdmin) && (
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
