const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const postRegEx = require("../middleware/postRegEx");
const requestLimiter = require("../middleware/Limiters");

//route get : getAllPosts
router.get("/getAllPosts", auth, postCtrl.getAllPosts);

//route get : getOnePost
router.get("/getOnePost", auth, postCtrl.getOnePost);

//route get : getPostsByUser
router.get("/getPostsByUser", auth, postCtrl.getPostsByUser);

//route post : createPost
router.post(
  "/createPost",
  requestLimiter,
  auth,
  postRegEx,
  multer,
  postCtrl.createPost
);

//route put : modifyPost
router.put("/modifyPost", auth, postRegEx, multer, postCtrl.modifyPost);

//route delete : deletePost
router.delete("/deletePost", auth, multer, postCtrl.deletePost);

//route post : likePost
router.post("/likePost", auth, postCtrl.likePost);

//route get : postCreator
router.get("/postCreator", auth, postCtrl.postCreator);

module.exports = router;
