const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create main model

const User = db.users;
const Post = db.posts;

// Creation d'un nouvel utilisateur

const addUser = async (req, res) => {
  const info = {
    email: req.body.email,
    password: req.body.password,
    nom: req.body.nom,
    prenom: req.body.prenom,
    photo: req.body.photo,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
  };

  // Validation des données
  const { error } = signupValidation(body);
  if (error) return res.status(401).json(error.details[0].message);

  const user = await User.create(info);
  res.status(200).send(user);
};

// Recupération d'un utilisateur

const getOneUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ where: { id: id } });
  res.status(200).send(user);
};

// Modification de l'utilisateur

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200).send(user);
};

// Récupération des posts de l'utilisateur

const getUserPost = async (req, res) => {
  const data = await User.findAll({
    include: [
      {
        model: Post,
        as: "post",
      },
    ],
    where: { id: 2 }, // Ce chiffre est pour l'exemple il faudra recupérer dynamiquement l'id de l'utilisateur
  });
  res.status(200).send("Les posts ont été récupérés");
};

module.exports = {
  addUser,
  getOneUser,
  updateUser,
  getUserPost,
};
