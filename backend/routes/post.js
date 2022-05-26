const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth'); 

//route get : getAllPosts
router.get('/getAllPosts', auth, postCtrl.getAllPosts);

//route get : getOnePost
router.get('/getOnePost', auth, postCtrl.getOnePost);

//route get : getPostsByUser
router.get('/getPostsByUser', auth, postCtrl.getPostsByUser);

//route post : createPost
router.post('/createPost', auth, multer, postCtrl.createPost);

//route put : modifyPost
router.put('/modifyPost', auth, multer, postCtrl.modifyPost);

//route delete : deletePost
router.delete('/deletePost', auth, multer, postCtrl.deletePost);

//route post : likePost

module.exports = router;