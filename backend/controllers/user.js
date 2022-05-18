require('dotenv').config();
const bcrypt = require('bcrypt');//Bcrypt sert a hasher les mdp afin de les sécuriser
const jwt = require('jsonwebtoken');//Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte
const mysql = require('mysql2');//Pour intéragir avec notre base de donnée
const dataBaseConnection = require('../config/dataBase');

const TOKEN = process.env.TOKEN;

//Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  const userUsername = req.body.username;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  
  bcrypt.hash(userPassword, 10)
    .then(hash => {
      const saveUser = "INSERT INTO users ( username, email, password ) VALUES ( userUsername, userEmail, hash )";
      dataBaseConnection.query(saveUser, function(error, result) {
        if (error) {
          return res.status(400).json({error})
        } else {
          const findUser = "SELECT id, username FROM users WHERE email = userEmail";
          dataBaseConnection.query(findUser, function (error, result) {
            if (result === userEmail ) {
              return res.status(401).json({ error: "Adresse mail déja utilisée !"});
            } else {
              return res.status(201).json({ message: "Utilisateur crée !"});
            }
          })
        }
      })     
    })
    .catch(error => res.status(500).json({ error }));    
};


//Connection d'un utilisateur existant
exports.login = (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const savedPassword = "SELECT password FROM users WHERE email = userEmail";
  const findUser = "SELECT id, username FROM users WHERE email = userEmail";
  dataBaseConnection.query(findUser, function (error, result) {
    if (result === "" || result == undefined) {
      return res.status(401).json({ error: "Utilisateur introuvable,veuillez vérifier votre adresse mail"});
    }
    bcrypt.compare(userPassword, savedPassword)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        const savedId = "SELECT id FROM users WHERE email = userEmail";
        res.status(200).json({
          userId: savedId,
          token: jwt.sign(
            { userId: savedId },
            `${TOKEN}`,
            { expiresIn: '24h' }
          )
        });
      })
    .catch(error => res.status(500).json({ error }));
  });
};
