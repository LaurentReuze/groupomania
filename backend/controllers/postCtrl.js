const db = require("../models");
const { getUserId, getIsAdmin } = require("../Utils/jwt");

// Creation d'un modèle principal
const User = db.users;
const Post = db.posts;
const Commentaire = db.commentaires;

// main work

// 1. create Post

const addPost = async (req, res) => {
  console.log("#####################################################");
  console.log("Controlleur création Post");
  console.log("#####################################################");

  let info = {
    titre: req.body.titre,
    contenu: req.body.contenu,
    idUSER: req.body.idUSER,
  };

  if (req.file) {
    info.photo = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  const post = await Post.create(info);
  res.status(200).send(post);
};

// Recuperer tout les posts

const getAllPost = async (req, res) => {
  console.log("#####################################################");
  console.log("Controlleur récupération de tous les posts");
  console.log("#####################################################");

  const posts = await Post.findAll({
    include: [User, Commentaire],
    order: [["createdAt", "DESC"]],
  });
  // console.log(posts);
  res.status(200).send(posts);
};

// Récuperer un post
const getOnePost = async (req, res) => {
  console.log("#####################################################");
  console.log("Controlleur récupération d'un seul Post");
  console.log("#####################################################");
  const id = req.params.id;
  const post = await Post.findOne({ where: { id: id } });
  res.status(200).send(post);
};

// Modifier un post
const updatePost = async (req, res) => {
  console.log("#####################################################");
  console.log("Controlleur Modification Post");
  console.log("#####################################################");

  const id = req.params.id;
  // Récupération du token
  const token = req.headers.cookie.split("=")[1];
  // Récupération des droits de l'utilisateur et de son N° ID
  const userId = getUserId(token);
  const isAdmin = getIsAdmin(token);

  // console.log(isAdmin);
  // console.log(userId);

  const findPost = await Post.findOne(req.body, { where: { id: id } });

  if (userId === findPost.idUSER || isAdmin) {
    // console.log("##### C'est le même user Id #####");
    const post = await Post.update(req.body, { where: { id: id } });
    res.status(200).send(post);
  } else {
    // console.log("#### Ce n'est pas le même id User ou Admin #####");
    res.status(401).json({ error: "Aucun droit pour le faire" });
  }
};

// Supprimer un Post
const deletePost = async (req, res) => {
  console.log("#####################################################");
  console.log("Controlleur suppréssion d'un Post");
  console.log("#####################################################");
  const id = req.params.id;
  // Récupération du token
  const token = req.headers.cookie.split("=")[1];
  // Récupération des droits de l'utilisateur et de son N° ID
  const userId = getUserId(token);
  const isAdmin = getIsAdmin(token);

  const findPost = await Post.findOne(req.body, { where: { id: id } });

  if (userId === findPost.idUSER || isAdmin) {
    // console.log("##### C'est le même user Id #####");
    await Post.destroy({ where: { id: id } });
    res.status(200).send("Le post a été supprimé");
  } else {
    // console.log("#### Ce n'est pas le même id User ou Admin #####");
    res.status(401).json({ error: "Aucun droit pour le faire" });
  }

  // Récupérer les infos du posts puis comparer l'ID de l'utilisateur avec l'ID du propriétaire du post
};

// Récupération des commentaire du post

const getCommentairePost = async (req, res) => {
  console.log("#####################################################");
  console.log("Controlleur des commentaires d'un Post");
  console.log("#####################################################");
  const data = await Post.findAll({
    include: [
      {
        model: Commentaire,
        as: "commentaire",
      },
    ],
    where: { id: 2 }, // Ce chiifre est pour l'exemple, il faudra recupérer dynamiquement l'id du post
  });
  res.status(200).send("Les commentaires ont été récupérés");
};

module.exports = {
  addPost,
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
  getCommentairePost,
};
