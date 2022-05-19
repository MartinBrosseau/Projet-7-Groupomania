require('dotenv').config();
const jwt = require('jsonwebtoken');//Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte
const mysql = require('mysql2');//Pour intéragir avec notre base de donnée
const dataBaseConnection = require('../config/dataBase');
const TOKEN = process.env.TOKEN;
const fs = require("fs");


exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  const postTitle = req.body.title;
  const postDescription = req.body.description;
  let imgUrl = "";

  if (req.file){
    imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }

  const savePost = "INSERT INTO posts (user_id, description, image, title) VALUES (userId, postDescription, imgUrl, postTitle)";
  dataBaseConnection.query(savePost, function(error, result) {
    if (error) {
      return res.status(400).json({ error: "La création du post a échouée !" });
    } else {
      return res.status(201).json({ message: "Nouveau post crée !"});
    }
  })
};


exports.modifyPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  const postId = req.params.id;
  const postImg = req.file;
  const postTitle = req.body.title;
  const postDescription = req.body.description;
  let imgUrl = "";

  if (postImg) {
    imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }

  const previousImg = "SELECT imageUrl FROM posts WHERE id = postId";
  const updatePost = "UPDATE posts SET description = postDescription, imageUrl = imgUrl, title = postTitle WHERE id = postId";
  dataBaseConnection.query(previousImg, function (error, result) {
    if (error) {
      return res.status(400).json({ error: "Suppression de l'image échouée"})
    } else {
      let previousImgUrl = result[0].imageUrl;
      if (previousImgUrl !=="") {
        const filename = previousImgUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {});
      } else {
        console.log("Pas d'image !");
      }
      dataBaseConnection.query(updatePost, function (error, result) {
        if (error) {
          return res.status(400).json({ error: "Echec de la modification"});
        } else {
          return res.status(200).json({message: "Post modifié !"});
        }
      });
    } 
  })
};


exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  const postId = req.params.id;
  const isAdmin = decodedToken.isAdmin;

  if( isAdmin !== 0) { //Suppression par un moderateur
    const postImg = "SELECT imageUrl FROM posts where id = postId";
    const deletePost = "DELETE FROM posts WHERE id = postId";
    dataBaseConnection.query(postImg, function (error, result) {
      if (error) {
        return res.status(400).json({ error: "La suppression de l'image a échouée"})
      } else {
        let imgUrl = result[0].imageUrl;
        if (imgUrl !=="") {
          const filename = imgUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        } else {
          console.log("Pas d'image");
        }

        dataBaseConnection.query(deletePost, function (error, result) {
          if (error) {
            return res.status(400).json({ error: "La suppression a échouée"})
          } else {
            return res.status(200).json({ message: "Post supprimé par un modérateur"})
          }
        });
      } 
    
      
    });
  } else { //Suppression par le créateur du post
    const postImg = "SELECT imageUrl FROM posts where id = postId";
    const deletePost = "DELETE FROM posts WHERE id = postId AND user_id = userId";
    dataBaseConnection.query(postImg, function(error, result) {
      if (error) {
        return res.status(400).json({ error: "La suppression a échouée"})
      } else {
        let imgUrl = result[0].imageUrl;
        if (imgUrl !=="") {
          const filename = imgUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        } else {
          console.log("Pas d'image");
        }
        dataBaseConnection.query(deletePost, function(error, result) {
          if (error) {
            return res.status(400).json({error: "La suppression du post a échouée"})
          } else {
            return res.status(200).json({ message: "Post supprimé par l'utilisateur"})
          }
        });
      }
    });
  }
};