const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
//route post : signup

//route post : login

//route get : getUserProfil

//route put : modifyUserProfil

//route delete : deleteUserProfil

