const commentaireCtrl = require("../controllers/commentaireCtrl.js");
const router = require("express").Router();
const verifToken = require("../Utils/verifToken");

router.post("/", verifToken, commentaireCtrl.addCommentaire);

router.delete("/:id", verifToken, commentaireCtrl.deleteCommentaire);

router.put("/:id", verifToken, commentaireCtrl.updateCommentaire);

module.exports = router;
