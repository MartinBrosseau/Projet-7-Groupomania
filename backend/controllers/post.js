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

  let savePost = "INSERT INTO posts (user_id, description, image, title) VALUES (userId, postDescription, imgUrl, postTitle)";
  let savePostValues = [userId, postDescription, imgUrl, postTitle];
  savePost = mysql.format(savePost, savePostValues);
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

  let previousImg = "SELECT imageUrl FROM posts WHERE id = ?";
  let previousImgValues = [postId];
  previousImg = mysql.format(previousImg, previousImgValues);
  let updatePost = "UPDATE posts SET description = ?, imageUrl = ?, title = ? WHERE id = ?";
  let updatePostValues = [postDescription, imgUrl, postTitle, postId];
  updatePost = mysql.format(updatePost, updatePostValues);
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
    let postImg = "SELECT imageUrl FROM posts where id = ?";
    let postImgValues = [postId];
    postImg = mysql.format(postImg, postImgValues);
    let deletePost = "DELETE FROM posts WHERE id = ?";
    let deletePostValues = [postId];
    deletePost = mysql.format(deletePost, deletePostValues);
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
    let postImg = "SELECT imageUrl FROM posts where id = ?";
    let postImgValues = [postId];
    postImg = mysql.format(postImg, postImgValues);
    let deletePost = "DELETE FROM posts WHERE id = ? AND user_id = ?";
    let deletePostValues = [postId, userId];
    deletePost = mysql.format(deletePost, deletePostValues);
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




exports.getAllPosts = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  let allPosts = "SELECT * FROM posts"
  dataBaseConnection.query(allPosts, function(error, result) {
    if (error) {
      return res.status(400).json({error: "Impossible de récupérer les posts"})
    } else {
      return res.status(200).json({message: "Récupération des posts réussie"})
    }
  });
}




exports.getOnePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  const postId = req.params.id;
  let onePost = "SELECT * FROM posts WHERE id = ?";
  let onePostValues = [postId];
  onePost = mysql.format(onePost, onePostValues);
  dataBaseConnection.query(onePost, function(error, result) {
    if (error) {
      return res.status(400).json({error: "Impossible de récupérer ce post"})
    } else {
      return res.status(200).json({message: "Récupération du post réussie"})
    }
  });
}




exports.getPostsByUser = (req, res, next) =>{
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  let postsByUser = "SELECT * FROM posts WHERE user_id = ?"
  let postsByUserValues = [userId];
  postsByUser = mysql.format(postsByUser, postsByUserValues);
  dataBaseConnection.query(postsByUser, function(error, result) {
    if (error) {
      return res.status(400).json({error: "Impossible de récupérer les posts de l'utilisateur"})
    } else {
      return res.status(200).json({message: "Récupération réussie !"})
    }
  });
}




exports.likePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  const like = req.body.like;
  if (like === 1) {
    
  }
}


