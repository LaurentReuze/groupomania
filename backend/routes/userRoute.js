const userCtrl = require("../controllers/userCtrl.js");
const router = require("express").Router();
const verifToken = require("../Utils/verifToken");
const multer = require("../config/multer-config");

router.post("/signup", multer, userCtrl.addUser);

router.post("/login", userCtrl.getOneUser);

router.get("/profil/:id", verifToken, userCtrl.getUserPost);

router.get("/cookie", verifToken, userCtrl.requireAuth);

router.get("/:id", verifToken, userCtrl.getInfoUser);

router.get("/:id/posts", verifToken, userCtrl.getInfoUser);

router.get("/", verifToken, userCtrl.getAllUser);

router.put("/:id", verifToken, multer, userCtrl.updateUser);

module.exports = router;
