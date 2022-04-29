const commentaireCtrl = require("../controllers/commentaireCtrl.js");
const router = require("express").Router();

router.post("/", commentaireCtrl.addCommentaire);

router.delete("/:id", commentaireCtrl.deleteCommentaire);

router.put("/:id", commentaireCtrl.updateCommentaire);

module.exports = router;
