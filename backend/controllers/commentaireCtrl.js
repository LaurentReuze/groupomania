const db = require("../models");

// create main model
const Commentaire = db.commentaires;

// main work

// Création d'un commentaire

const addCommentaire = async (req, res) => {
  const info = {
    contenu: req.body.contenu,
    Image: req.body.image,
  };

  const commentaire = await Commentaire.create(info);
  res.status(200).send(commentaire);
};

// Recuperer tout les posts

const getAllCommentaire = async (req, res) => {
  const commentaires = await Commentaire.findAll({});
  res.status(200).send(commentaires);
};

// Récuperer un post
const getOneCommentaire = async (req, res) => {
  const id = req.params.id;
  const commentaire = await Commentaire.findOne({ where: { id: id } });
  res.status(200).send(commentaire);
};

// Modifier un post
const updateCommentaire = async (req, res) => {
  const id = req.params.id;
  const commentaire = await Commentaire.update(req.body, { where: { id: id } });
  res.status(200).send(commentaire);
};

// Supprimer un Post
const deleteCommentaire = async (req, res) => {
  const id = req.params.id;
  await Commentaire.destroy({ where: { id: id } });
  res.status(200).send("Le commentaire a été supprimé");
};

module.exports = {
  addCommentaire,
  getAllCommentaire,
  getOneCommentaire,
  updateCommentaire,
  deleteCommentaire,
};
