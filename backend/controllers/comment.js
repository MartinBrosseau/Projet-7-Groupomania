require('dotenv').config();
const jwt = require('jsonwebtoken');//Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte
const mysql = require('mysql2');//Pour intéragir avec notre base de donnée
const dataBaseConnection = require('../config/dataBase');
const TOKEN = process.env.TOKEN;





exports.createComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId;
  const postId = req.params.id;
  const content = req.body.content;

  let saveComment = "INSERT INTO comments ( user_id, post_id, content) VALUES  ( ?, ?, ? )";
  let saveCommentValues = [userId, postId, content];
  saveComment = mysql.format(saveComment, saveCommentValues);
  dataBaseConnection.query(saveComment, function(error, result) {
      if (error) {
          return res.status(400).json({ error: "La création du commentaire a échouée"});
      } else {
          return res.status(200).json({ message: "Commentaire crée !"})
      }
  })
};




exports.modifyComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId; 
  const commentId = req.params.id;
  const newContent = req.body.content;
  
  let updatePost = "UPDATE comments SET content = ?";
  let updatePostValues = [newContent];
  updatePost = mysql.format(updatePost, updatePostValues);
  dataBaseConnection.query(updatePost, function(error, result) {
      if (error) {
          return res.status(400).json({ error: "La modification a échouée"});
      } else {
          return res.status(200).json({ message: "Modification réussie"})
      }
  });
};




exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token,`${TOKEN}`);
  const userId = decodedToken.userId; 
  const isAdmin = decodedToken.isAdmin;
  const commentId = req.params.id;

  if (isAdmin !== 0) { //Suppression par un modérateur
      let deleteComment = "DELETE FROM comments WHERE id = ?";
      let deleteCommentValues = [commentId];
      deleteComment = mysql.format(deleteComment, deleteCommentValues);
      dataBaseConnection.query(deleteComment, function(error, result) {
          if (error) {
              return res.status(400).json({ error: "La suppression a échouée"});
          } else {
              return res.status(200).json({ message: "Commentaire supprimé par un modérateur"})
          }
      });    
    } else { //Suppression par le créateur du commentaire
        let deleteComment = "DELETE FROM comments WHERE id = ? AND user_id = ?";
        let deleteCommentValues = [commentId, userId];
        deleteComment = mysql.format(deleteComment, deleteCommentValues);
        dataBaseConnection.query(deleteComment, function(error, result) {
            if (error) {
                return res.status(400).json({ error: "La suppression a échouée"});
            } else {
                return res.status(200).json({ message: "Commentaire supprimé par son créateur !"})
            }
        });
    }
};


