const db = require("../models");

// Creation d'un modèle principal
const Post = db.posts;
const Commentaire = db.commentaires;

// main work

// 1. create Post

const addPost = async (req, res) => {
  const info = {
    titre: req.body.titre,
    contenu: req.body.contenu,
    image: req.body.image,
  };

  const post = await Post.create(info);
  res.status(200).send(post);
};

// Recuperer tout les posts

const getAllPost = async (req, res) => {
  const posts = await Post.findAll({}); // A mettre aussi une récupération des commentaires
  res.status(200).send(posts);
};

// Récuperer un post
const getOnePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({ where: { id: id } });
  res.status(200).send(post);
};

// Modifier un post
const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.update(req.body, { where: { id: id } });
  res.status(200).send(post);
};

// Supprimer un Post
const deletePost = async (req, res) => {
  const id = req.params.id;
  await Post.destroy({ where: { id: id } });
  res.status(200).send("Le post a été supprimé");
};

// Récupération des commentaire du post

const getCommentairePost = async (req, res) => {
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
