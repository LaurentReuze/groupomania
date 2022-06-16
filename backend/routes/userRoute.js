const userCtrl = require("../controllers/userCtrl.js");
const router = require("express").Router();
const verifToken = require("../Utils/verifToken");
const multer = require("../config/multer-config");

router.post("/signup", multer, userCtrl.addUser);

router.post("/login", userCtrl.getOneUser);

router.get("/profil", verifToken, userCtrl.getUserPost);

router.get("/cookie", userCtrl.requireAuth);

router.get("/:id", userCtrl.getInfoUser);

router.get("/", userCtrl.getAllUser);

router.put("/:id", userCtrl.updateUser);

module.exports = router;
