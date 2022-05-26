const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

//route post : createComment
router.post('/createComment', auth, commentCtrl.createComment);

//route put : modifyComment
router.put('/modifyComment', auth, commentCtrl.modifyComment);

//route delete : deleteComment
router.delete('/deleteComment', auth, commentCtrl.deleteComment);

module.exports = router;