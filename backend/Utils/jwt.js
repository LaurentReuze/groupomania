const jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      privateKey,
      {
        expiresIn: "24h",
      }
    );
  },
  getUserId: function (token) {
    // Decodage du token
    const decodeToken = jwt.verify(token, privateKey);
    // Déclaration UserId
    const userId = decodeToken.userId;

    return userId;
  },
  getIsAdmin: function (token) {
    // Decodage du token
    const decodeToken = jwt.verify(token, privateKey);
    // Déclaration isAdmin
    const isAdmin = decodeToken.isAdmin;

    return isAdmin;
  },
};
