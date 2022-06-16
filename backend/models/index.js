const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

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
    // console.log("error" + err);
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
});
db.users.hasMany(db.commentaires, {
  foreignKey: "idUSER",
});
db.posts.hasMany(db.commentaires, {
  foreignKey: "idPOST",
});

db.posts.belongsTo(db.users, {
  foreignKey: "idUSER",
});

db.commentaires.belongsTo(db.users, {
  foreignKey: "idUSER",
});

db.commentaires.belongsTo(db.posts, {
  foreignKey: "idPOST",
});

module.exports = db;
