import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCommentairesData } from "../../feature/commentairesSlice";
import CardComment from "../Comment/CardComment";
import { IsAdminContext, UidContext } from "../AppContext";
import { dateParser } from "../../Tools/ConvDate";
import { setConnexionsData } from "../../feature/connexionSlice";

const Card = ({ post }) => {
  const [loadComment, setLoadComment] = useState(true);
  const [loadCard, setLoadCard] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [titreUpdate, setTitreUpdate] = useState();
  const [contenuUpdate, setContenuUpdate] = useState();
  const [contenuComment, setContenuComment] = useState();
  const [affichageComment, setAffichageComment] = useState(false);
  const uid = useContext(UidContext);
  const isAdmin = useContext(IsAdminContext);
  const dispatch = useDispatch();
  const connexions = useSelector((state) => state.connexions.connexions);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/cookie`,
      withCredentials: true,
    }).then((res) => {
      dispatch(setConnexionsData(res.data));
      setLoadCard(true);
    });
  }, [loadCard]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/comment/`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    }).then((res) => {
      dispatch(setCommentairesData(res.data));
      setLoadComment(true);
    });
  }, [loadComment]);

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
      loadCard(false);
    });
  };

  const deletedPost = async () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
      withCredentials: true,
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      setLoadCard(false);
      window.location = "/";
    });
  };

  const addComment = async () => {
    console.log(contenuComment);
    console.log(post.id);
    console.log(uid);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comment/`,
      withCredentials: true,
      headers: { "Content-type": "application/json" },
      data: {
        contenu: contenuComment,
        idUSER: uid,
        idPOST: post.id,
      },
    }).then((res) => {
      setLoadComment(false);
      setLoadCard(false);
      window.location = "/";
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
        {(uid === post.idUSER || isAdmin) && (
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
                onChange={(e) => setContenuComment(e.target.value)}
              />
              <div className="sendComment">
                <button onClick={addComment}>Commenter</button>
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
