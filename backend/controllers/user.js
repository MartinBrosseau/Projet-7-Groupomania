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
      let saveUser = "INSERT INTO users ( username, email, password ) VALUES ( ?, ?, ? )";
      let saveUserValues = [ userUsername, userEmail, hash];
      saveUser = mysql.format(saveUser, saveUserValues);
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
  let findUser = "SELECT id, username, email, password, admin FROM users WHERE email = ?";
  let findUserValues = [userEmail];
  findUser = mysql.format(findUser, findUserValues);
  dataBaseConnection.query(findUser, function (error, result) {
    if (result === "" || result == undefined) {
      return res.status(401).json({ error: "Utilisateur introuvable,veuillez vérifier votre adresse mail"});
    }
    bcrypt.compare(userPassword, result[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: result[0].id,
          isAdmin: result[0].admin,
          token: jwt.sign(
            { userId: result[0].id, isAdmin: result[0].admin },
            `${TOKEN}`,
            { expiresIn: '24h' }
          )
        });
      })
    .catch(error => res.status(500).json({ error }));
  });
};




exports.userProfil = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
//Récuperation de l'utilisateur grâce a son token fournit lors de la connection
  if (Number(req.paramq.id) === userId) {
    let getUser = "SELECT username, email FROM users WHERE id = ?";
    let getUserValues = [userId];
    getUser = mysql.format(getUser, getUserValues);
    dataBaseConnection.query(getUser, function (error, result) {
      if (result === "" || result == undefined) {
        return res.status(400).json({error : "Utilisateur introuvable !"})
      } else {
        return res.status(200).json({
          username: result[0].username, 
          email: result[0].email
        })
      }
    })
  } else {
    return res.status(400).json({ error: "Vous n'êtes pas autorisé a faire cela !"})
  }
};




exports.modifyUserProfil = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  const newUsername = req.body.username;
  let updateProfile = "UPDATE users SET username = ? WHERE id = ?";
  let updateProfileValues = [newUsername, userId];
  updateProfile = mysql.format(updateProfile, updateProfileValues);
  dataBaseConnection.query(updateProfile, function(error, result) {
    if (error) {
      return res.status(400).json({error: "Modification impossible"})
    } else {
      return res.status(200).json({message: "Modification effectuée !"})
    }
  });
}




exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;

  if(Number(req.params.id) === userId) {
    let deleteUser = "DELETE FROM users WHERE id = ?";
    let deleteUserValues = [userId];
    deleteUser = myssql.format(deleteUser, deleteUserValues);
    dataBaseConnection.query(deleteUser, function(error, result) {
      if (error) {
        return res.status(400).json({ error: "La suppression a échouée !"})
      } else {
        return res.status(200).json({message: "Suppression réussie !"})
      }
    });
  } else {
    return res.status(400).json({error: "Vous n'êtes pas autorisé a faire cela !"})
  }
};
