module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define("commentaire", {
    contenu: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

  return Commentaire;
};
