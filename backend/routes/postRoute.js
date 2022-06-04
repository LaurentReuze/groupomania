const postCtrl = require("../controllers/postCtrl.js");
const router = require("express").Router();
const verifToken = require("../Utils/verifToken");
const multer = require("../config/multer-config");

router.get("/", verifToken, postCtrl.getAllPost);

router.get("/:id", verifToken, postCtrl.getOnePost);

router.post("/", verifToken, multer, postCtrl.addPost);

router.delete("/:id", verifToken, postCtrl.deletePost);

router.put("/:id", verifToken, multer, postCtrl.updatePost);

module.exports = router;
