const userCtrl = require("../controllers/userCtrl.js");
const router = require("express").Router();

router.post("/signup", userCtrl.addUser);

router.post("/login", userCtrl.getOneUser);

router.get("/profil", userCtrl.getUserPost);

router.get("/auth", userCtrl.requireAuth);

module.exports = router;
