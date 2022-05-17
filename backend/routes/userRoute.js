const userCtrl = require("../controllers/userCtrl.js");
const verifToken = require("../Utils/verifToken.js");
const router = require("express").Router();

router.post("/signup", userCtrl.addUser);

router.post("/login", userCtrl.getOneUser);

router.get("/profil", userCtrl.getUserPost);

router.get("/cookie", userCtrl.requireAuth);

module.exports = router;
