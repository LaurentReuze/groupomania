import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCommentairesData } from "../../feature/commentairesSlice";
import CardComment from "../Comment/CardComment";
import { deletePost, updatePost } from "../../feature/postsSlice";
import { isAdmin, UidContext } from "../AppContext";

const Card = ({ post }) => {
  const [loadComment, setLoadComment] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [titreUpdate, setTitreUpdate] = useState();
  const [contenuUpdate, setContenuUpdate] = useState();
  const [affichageComment, setAffichageComment] = useState(false);
  const uid = useContext(UidContext);
  // const [nbrComment, setNbrComment] = useState();
  const dispatch = useDispatch();
  const connexions = useSelector((state) => state.connexions.connexions);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/comment/`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    }).then((res) => {
      dispatch(setCommentairesData(res.data));
      setLoadComment(false);
    });
  }, [loadComment, dispatch]);

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

  const uploadUpdate = async () => {
    console.log(titreUpdate);
    console.log(contenuUpdate);

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
      withCredentials: true,
      headers: { "Content-type": "application/json" },
      data: {
        titre: titreUpdate,
        contenu: contenuUpdate,
      },
    }).then((res) => {
      setIsUpdated(false);
      // dispatch(updatePost(post.id));
      dispatch(updatePost(post.id));
    });
  };

  const deletedPost = async () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
      withCredentials: true,
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      // console.log(post.id);
      dispatch(deletePost(post.id));
    });
  };

  return (
    <li className="card-container" key={post.id}>
      <div className="headerPost">
        <div className="identityUser">
          {post.user.prenom} {post.user.nom}
        </div>
        <div className="publicationDate">{dateParser(post.createdAt)}</div>
      </div>
      <div className="bodyPost">
        {isUpdated === false && <div className="titre">{post.titre}</div>}
        {isUpdated && (
          <div className="modifTitre">
            <input
              type="text"
              defaultValue={post.titre}
              onChange={(e) => setTitreUpdate(e.target.value)}
            />
          </div>
        )}
        {isUpdated === false && <div className="contenu">{post.contenu}</div>}
        {isUpdated && (
          <div className="modifContenu">
            <textarea
              cols="30"
              rows="3"
              defaultValue={post.contenu}
              onChange={(e) => setContenuUpdate(e.target.value)}
            ></textarea>
            <div className="lastLine">
              <button className="buttonUpdate" onClick={uploadUpdate}>
                Enregistrer les modifications
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="imagePost">
        {post.photo ? <img src={post.photo} alt="" /> : ""}
      </div>
      <div className="iconsLine">
        <div className="commentIcon">
          <img
            src="./img/icons/comment.svg"
            alt="commentaire"
            onClick={() => setAffichageComment(!affichageComment)}
          />
          {post.commentaires.length ? (
            <span>({post.commentaires.length})</span>
          ) : (
            ""
          )}
        </div>
        {(uid === post.idUSER || connexions.isAdmin) && (
          <div className="ownerAdminIcon">
            <div className="iconEdit" onClick={() => setIsUpdated(!isUpdated)}>
              <img src="./img/icons/edit.svg" alt="edit" />
            </div>
            <div className="iconTrash" onClick={deletedPost}>
              <img src="./img/icons/trash.svg" alt="trash" />
            </div>
          </div>
        )}
      </div>
      <div className="commentaire">
        {affichageComment && (
          <div className="test">
            <div className="postComment">
              <input
                className="editComment"
                type="text"
                placeholder={"Exprimez-vous!"}
                onChange={(e) => setTitreUpdate(e.target.value)}
              />
              <div className="sendComment">
                <button>Commenter</button>
              </div>
            </div>
            <CardComment post={post} />
          </div>
        )}
      </div>
    </li>
  );
};

export default Card;
