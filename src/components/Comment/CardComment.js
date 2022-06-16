import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";

const CardComment = ({ post }) => {
  const users = useSelector((state) => state.users.users);
  const commentaires = useSelector((state) => state.commentaires.commentaires);
  const connexions = useSelector((state) => state.connexions.connexions);
  const uid = useContext(UidContext);
  const [isUpdated, setIsUpdated] = useState(false);

  console.log(post);

  const dateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
  };

  const deleteComment = async () => {};

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
              {(uid === commentaire.idUSER || connexions.isAdmin) && (
                <div className="iconTrash" onClick={deleteComment}>
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
