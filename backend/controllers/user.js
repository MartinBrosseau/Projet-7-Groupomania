require("dotenv").config();
const bcrypt = require("bcrypt"); //Bcrypt sert a hasher les mdp afin de les sécuriser
const jwt = require("jsonwebtoken"); //Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte
const mysql = require("mysql2"); //Pour intéragir avec notre base de donnée
const dataBaseConnection = require("../config/dataBase");
const TOKEN = process.env.TOKEN;

//Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  const userUsername = req.body.username;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  bcrypt
    .hash(userPassword, 10)
    .then((hash) => {
      let saveUser =
        "INSERT INTO users ( username, email, password, admin ) VALUES ( ?, ?, ?, 0 )";
      let saveUserValues = [userUsername, userEmail, hash];
      saveUser = mysql.format(saveUser, saveUserValues);
      let findUser = "SELECT id FROM users WHERE email = ?";
      let findUserValues = [userEmail];
      findUser = mysql.format(findUser, findUserValues);
      dataBaseConnection.query(findUser, function (error, alreadyExist) {
        if (error) {
          return res
            .status(400)
            .json({ error: "Impossible de récupérer les données" });
        } else {
          if (alreadyExist.length !== 0) {
            return res
              .status(400)
              .json({ error: "Cette adresse mail est déja utilisée !" });
          } else {
            dataBaseConnection.query(saveUser, function (error, result) {
              console.log(result);
              if (error) {
                return res
                  .status(400)
                  .json({ error: "L'inscription a échouée" });
              } else {
                return res.status(201).json({
                  message: console.log("Utilisateur inscrit !"),
                  userId: result.insertId,
                  isAdmin: 0,
                  token: jwt.sign(
                    { userId: result.insertId, isAdmin: 0 },
                    `${TOKEN}`,
                    { expiresIn: "24h" }
                  ),
                });
              }
            });
          }
        }
      });
    })
    .catch((error) => res.status(500).json({ error: "server issue" }));
};

//Connection d'un utilisateur existant
exports.login = (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  let findUser =
    "SELECT id, username, email, password, admin FROM users WHERE email = ?";
  let findUserValues = [userEmail];
  findUser = mysql.format(findUser, findUserValues);
  dataBaseConnection.query(findUser, function (error, result) {
    console.log(result);
    if (result === "" || result == undefined) {
      return res.status(401).json({
        error: "Utilisateur introuvable,veuillez vérifier votre adresse mail",
      });
    }
    bcrypt
      .compare(userPassword, result[0].password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: result[0].id,
          isAdmin: result[0].admin,
          token: jwt.sign(
            { userId: result[0].id, isAdmin: result[0].admin },
            `${TOKEN}`,
            { expiresIn: "24h" }
          ),
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.userProfil = (req, res, next) => {
  //Récuperation de l'utilisateur grâce a son token fournit lors de la connection
  let getUser = "SELECT username, email, id, admin FROM users WHERE id = ?";
  let getUserValues = [req.auth.userId];
  getUser = mysql.format(getUser, getUserValues);
  dataBaseConnection.query(getUser, function (error, result) {
    if (result === "" || result == undefined) {
      return res.status(400).json({ error: "Utilisateur introuvable !" });
    } else {
      return res.status(200).json({
        username: result[0].username,
        email: result[0].email,
        id: result[0].id,
        admin: result[0].admin,
      });
    }
  });
};

exports.modifyUserProfil = (req, res, next) => {
  const newUsername = req.body.username;
  let updateProfile = "UPDATE users SET username = ? WHERE id = ?";
  let updateProfileValues = [newUsername, req.auth.userId];
  updateProfile = mysql.format(updateProfile, updateProfileValues);
  dataBaseConnection.query(updateProfile, function (error, result) {
    if (error) {
      return res.status(400).json({ error: "Modification impossible" });
    } else {
      return res.status(200).json({ message: "Modification effectuée !" });
    }
  });
};

exports.deleteUser = (req, res, next) => {
  console.log(req.query.id);
  console.log(req.auth.userId);
  if (Number(req.query.id) === req.auth.userId) {
    let deleteUser = "DELETE FROM users WHERE id = ?";
    let deleteUserValues = [req.auth.userId];
    deleteUser = mysql.format(deleteUser, deleteUserValues);
    dataBaseConnection.query(deleteUser, function (error, result) {
      if (error) {
        return res.status(400).json({ error: "La suppression a échouée !" });
      } else {
        return res.status(200).json({ message: "Suppression réussie !" });
      }
    });
  } else {
    return res
      .status(401)
      .json({ error: "Vous n'êtes pas autorisé a faire cela !" });
  }
};
