module.exports = (sequelize, DataTypes) => {
  console.log("#################################");
  console.log("Je suis passé par le fichier Post Model");
  console.log("#################################");
  const Post = sequelize.define("post", {
    titre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contenu: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    photo: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  return Post;
};
