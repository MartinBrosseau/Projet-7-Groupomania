const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth'); 

//route get : getAllPosts

//route get : getOnePost

//route post : createPost
router.post('/createPost', auth, multer, postCtrl.createPost);

//route put : modifyPost
router.put('/modifyPost', auth, multer, postCtrl.modifyPost);

//route delete : deletePost
router.delete('/deletePost', auth, multer, postCtrl.deletePost);

//route post : like

module.exports = router;