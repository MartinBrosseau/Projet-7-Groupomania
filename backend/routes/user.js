const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');



//route post : signup
router.post('/signup', userCtrl.signup);

//route post : login
router.post('/login', userCtrl.login);

//route get : userProfil
router.get('/userProfil', userCtrl.userProfil);

//route put : modifyUserProfil

//route delete : deleteUserProfil
router.delete('/deleteUser', userCtrl.deleteUser);

module.exports = router;