module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    nom: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    prenom: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      default: false,
    },
    photo: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  return User;
};
