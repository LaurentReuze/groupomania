const postCtrl = require("../controllers/postCtrl.js");
const router = require("express").Router();

router.get("/", postCtrl.getAllPost);

router.get("/:id", postCtrl.getOnePost);

router.post("/", postCtrl.addPost);

router.delete("/:id", postCtrl.deletePost);

router.put("/:id", postCtrl.updatePost);

module.exports = router;
