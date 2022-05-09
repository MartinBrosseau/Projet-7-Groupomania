const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');



//route post : signup
router.post('/signup', userCtrl.signup);

//route post : login
router.post('/login', userCtrl.login);

//route get : getUserProfil

//route put : modifyUserProfil

//route delete : deleteUserProfil

