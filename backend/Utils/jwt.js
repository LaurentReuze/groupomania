const jwt = require("jsonwebtoken");

const privateKey = "TDAHu84KRXgLa7PAA5piEP7lxYBt5GT7RxvRSHeE";

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
};
