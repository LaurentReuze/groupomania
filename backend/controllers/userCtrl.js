const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../Utils/jwt.js");
const signupValidation = require("../validator/signupValidation.js");
const loginValidation = require("../validator/loginValidation");
const privateKey = process.env.PRIVATE_KEY;
const jwtoken = require("jsonwebtoken");

// create main model

const User = db.users;
const Post = db.posts;

// ---------------------- Creation d'un nouvel utilisateur ------------------

const addUser = async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    nom: req.body.nom,
    prenom: req.body.prenom,
    photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
  };

  // Validation des données
  const { error } = signupValidation(req.body);
  if (error) return res.status(401).json(error.details);

  const findUser = await User.findOne({ where: { email: newUser.email } })
    .then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(req.body.password, 10).then((hashPassword) => {
          const user = {
            email: req.body.email,
            password: hashPassword,
            nom: req.body.nom,
            prenom: req.body.prenom,
            photo: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
            isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
          };
          User.create(user).then((user) => {
            User.findOne({ where: { email: user.email } }).then(function (
              entries
            ) {
              // console.log(entries);
              res.status(201).json({ token: jwt.generateTokenForUser(user) });
            });
          });
        });
      } else {
        return res.status(409).json({
          errorIdemAdress: `Un compte a déjà été crée avec l'adresse ${req.body.email} `,
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
        return res.status(401).json({ errorLogin: "Utilisateur non trouvé" });
      }
      console.log(req.body.password);
      console.log(user.password);
      // console.log(process.env.PRIVATE_KEY);
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ errorPassword: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            token: jwt.generateTokenForUser(user),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// -------------------- récupération des données de l'utilisateur ----------------------
const getInfoUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ where: { id: id } });
  res.status(200).send(user);
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
  const token = req.headers.cookie.split("=")[1];
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

// ------------------------- Vérification de la présence du token ---------------------------------

const requireAuth = async (req, res) => {
  const reqCookie = req.headers.cookie;
  if (reqCookie) {
    // console.log(req.headers.cookie);
    const token = req.headers.cookie.split("=")[1];
    // jwtoken.verify vérifie le token avec la clé Publique
    // On recupère un objet JS
    const decodeToken = jwtoken.verify(token, privateKey);
    // on recupère le userId de l'objet JS decodeToken
    const userId = decodeToken.userId;
    const isAdmin = decodeToken.isAdmin;
    const userObj = { userId, isAdmin };

    res.status(200).json({ userObj });
  } else {
    res.status(401).json({ message: "Aucun Cookie" });
  }
};

module.exports = {
  addUser,
  getOneUser,
  updateUser,
  getUserPost,
  requireAuth,
  getInfoUser,
};
