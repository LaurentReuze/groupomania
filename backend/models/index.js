const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connecté");
  })
  .catch((err) => {
    console.log("error" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tables de la BD

db.users = require("./userModel.js")(sequelize, DataTypes);
db.posts = require("./postModel.js")(sequelize, DataTypes);
db.commentaires = require("./commentaireModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("ReSync faite !");
});

// Association des tables

db.users.hasMany(db.posts, {
  foreignKey: "idUSER",
  as: "post",
});
db.users.hasMany(db.commentaires, {
  foreignKey: "idUSER",
  as: "commentaire",
});
db.posts.hasMany(db.commentaires, {
  foreignKey: "idPOST",
  as: "commentaire",
});

db.posts.belongsTo(db.users, {
  foreignKey: "idUSER",
  as: "user",
});

db.commentaires.belongsTo(db.users, {
  foreignKey: "idUSER",
  as: "user",
});

db.commentaires.belongsTo(db.posts, {
  foreignKey: "idPOST",
  as: "post",
});

module.exports = db;
