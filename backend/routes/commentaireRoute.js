const commentaireCtrl = require("../controllers/commentaireCtrl.js");
const router = require("express").Router();
const verifToken = require("../Utils/verifToken");
const multer = require("../config/multer-config");

router.post("/", verifToken, commentaireCtrl.addCommentaire);

router.get("/", verifToken, commentaireCtrl.getAllCommentaire);

router.delete("/:id", verifToken, multer, commentaireCtrl.deleteCommentaire);

// GET /api/post/:postId/comments
// POST /api/post/:postId/comments
// DELETE /api/post/:postId/comments/:commentId

module.exports = router;
