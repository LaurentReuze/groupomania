module.exports = (sequelize, DataTypes) => {
  console.log("#################################");
  console.log("Je suis passé par le fichier Commentaire Model");
  console.log("#################################");
  const Commentaire = sequelize.define("commentaire", {
    contenu: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    photo: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

  return Commentaire;
};
