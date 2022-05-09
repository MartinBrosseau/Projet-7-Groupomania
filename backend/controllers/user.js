require('dotenv').config();
const bcrypt = require('bcrypt');//Bcrypt sert a hasher les mdp afin de les sécuriser
const User = require('../models/user');//On import notre model User
const jwt = require('jsonwebtoken');//Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte
const TOKEN = process.env.TOKEN;

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            email : req.body.email,
            password : hash
        });
        user.save()
        .then(() => res.status(201).json({message : 'Utilisateur crée !'}))
        .catch(error => res.status(500).json({ error }));
    })
};