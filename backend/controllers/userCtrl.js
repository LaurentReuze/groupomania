const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../Utils/jwt.js");
const signupValidation = require("../validator/signupValidation.js");
const loginValidation = require("../validator/loginValidation");

// create main model

const User = db.users;
const Post = db.posts;

// ---------------------- Creation d'un nouvel utilisateur ------------------

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
  const { error } = signupValidation(info);
  if (error) return res.status(401).json(error.details[0].message);

  const finduser = await User.findOne({ where: { email: info.email } })
    .then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(req.body.password, 10).then((hashPassword) => {
          const user = {
            email: req.body.email,
            password: hashPassword,
            nom: req.body.nom,
            prenom: req.body.prenom,
            photo: req.body.photo,
            isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
          };
          User.create(user);
          res.status(201).json({ message: "Utilisateur créé !" });
        });
      } else {
        return res.status(409).json({
          error: `Un compte a déjà été crée avec l'adresse ${info.email} `,
        });
      }
    })
    .catch(function (err) {
      console.log(err);
      return res.status(500).json({ err });
    });
};

// --------------------- Login de l'utilisateur ---------------------------

const getOneUser = async (req, res) => {
  // Validation des données

  const { error } = loginValidation(req.body);
  if (error) return res.status(401).json(error.details);

  const finduser = await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      console.log(req.body.password);
      console.log(user.password);
      // console.log(process.env.PRIVATE_KEY);
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            token: jwt.generateTokenForUser(user),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// -------------------- Modification de l'utilisateur ----------------------

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200);
};

// -------------------- Récupération des posts de l'utilisateur ----------------

const getUserPost = async (req, res) => {
  // --------- recupération du numéro id de l'utilisateur via le token ------------
  // récupération du token
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.getUserId(token);
  //
  const data = await User.findOne({
    include: [
      {
        model: Post,
        as: "post",
      },
    ],
    where: { id: userId }, // Ce chiffre est pour l'exemple il faudra recupérer dynamiquement l'id de l'utilisateur
  });
  res.status(200).send(data.post);
  console.log(data);
};

const requireAuth = async (req, res) => {
  res.status(200).send(res.userId);
};

module.exports = {
  addUser,
  getOneUser,
  updateUser,
  getUserPost,
  requireAuth,
};
