module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    titre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contenu: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

  return Post;
};
