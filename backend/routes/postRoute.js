const postCtrl = require("../controllers/postCtrl.js");
const router = require("express").Router();
const verifToken = require("../Utils/verifToken");

router.get("/", verifToken, postCtrl.getAllPost);

router.get("/:id", verifToken, postCtrl.getOnePost);

router.post("/", verifToken, postCtrl.addPost);

router.delete("/:id", verifToken, postCtrl.deletePost);

router.put("/:id", verifToken, postCtrl.updatePost);

module.exports = router;
