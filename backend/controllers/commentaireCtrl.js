const db = require("../models");
const jwtoken = require("jsonwebtoken");
const { getUserId, getIsAdmin } = require("../Utils/jwt");
const privateKey = process.env.PRIVATE_KEY;

// create main model
const Commentaire = db.commentaires;
const User = db.users;

// main work

// Création d'un commentaire

const addCommentaire = async (req, res) => {
  console.log("#####################################################");
  console.log(req.body);
  console.log("#####################################################");
  let info = {
    contenu: req.body.contenu,
    idUSER: req.body.idUSER,
    idPOST: req.body.idPOST,
  };

  console.log("#####################################################");
  console.log(info);
  console.log("#####################################################");

  const commentaire = await Commentaire.create(info);
  res.status(200).send(commentaire);
};

// Recuperer tout les commentaires

const getAllCommentaire = async (req, res) => {
  const commentaires = await Commentaire.findAll({
    include: User,
  });
  res.status(200).send(commentaires);
};

// Supprimer un Post
const deleteCommentaire = async (req, res) => {
  const id = req.params.id;

  // Sécurisation de la route

  const token = req.headers.cookie.split("=")[1];

  const userId = getUserId(token);
  const isAdmin = getIsAdmin(token);

  const findComment = await Commentaire.findOne(req.body, {
    where: { id: id },
  });

  if (userId === findComment.idUSER || isAdmin) {
    await Commentaire.destroy({ where: { id: id } });
    res.status(200).send("Le commentaire a été supprimé");
  } else {
    res.status(401).json({ error: "Aucun droit pour le faire" });
  }

  // TODO : Vérifier que le propriétaire est bien celui qui essaie de supprimer le commentaire (OU ADMIN)
};

module.exports = {
  addCommentaire,
  getAllCommentaire,
  deleteCommentaire,
};
