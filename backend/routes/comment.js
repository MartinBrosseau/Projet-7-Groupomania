const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const requestLimiter = require("../middleware/Limiters");
const commentRegEx = require("../middleware/commentRegEx");

//route get : getComments
router.get("/getComments", auth, commentCtrl.getComments);

//route post : createComment
router.post(
  "/createComment",
  requestLimiter,
  auth,
  commentRegEx,
  commentCtrl.createComment
);

//route delete : deleteComment
router.delete("/deleteComment", auth, commentCtrl.deleteComment);

module.exports = router;
