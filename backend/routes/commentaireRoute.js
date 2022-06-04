const commentaireCtrl = require("../controllers/commentaireCtrl.js");
const router = require("express").Router();
const verifToken = require("../Utils/verifToken");
const multer = require("../config/multer-config");

router.post("/", verifToken, multer, commentaireCtrl.addCommentaire);

router.delete("/:id", verifToken, multer, commentaireCtrl.deleteCommentaire);

router.put("/:id", verifToken, multer, commentaireCtrl.updateCommentaire);

module.exports = router;
