require("dotenv").config();
const jwt = require("jsonwebtoken"); //Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte
const mysql = require("mysql2"); //Pour intéragir avec notre base de donnée
const dataBaseConnection = require("../config/dataBase");
const TOKEN = process.env.TOKEN;

exports.createComment = (req, res, next) => {
  const postId = req.query.postId;
  const content = req.body.content;

  let saveComment =
    "INSERT INTO comments ( user_id, post_id, content) VALUES  ( ?, ?, ? )";
  let saveCommentValues = [req.auth.userId, postId, content];
  saveComment = mysql.format(saveComment, saveCommentValues);
  dataBaseConnection.query(saveComment, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ error: "La création du commentaire a échouée" });
    } else {
      return res.status(200).json({ message: "Commentaire crée !" });
    }
  });
};

exports.getComments = (req, res, next) => {
  const postId = req.query.postId;
  let getComments =
    "SELECT * FROM comments, users WHERE (comments.post_id = ? AND comments.user_id = users.id) ";
  let getCommentsValues = [postId];
  getComments = mysql.format(getComments, getCommentsValues);
  dataBaseConnection.query(getComments, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ error: "Récupération des commentaires impossible" });
    } else {
      console.log(result);
      return res.status(200).json(result);
    }
  });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.query.commentId;

  if (req.auth.isAdmin !== 0) {
    //Suppression par un modérateur
    let deleteComment = "DELETE FROM comments WHERE ID = ?";
    let deleteCommentValues = [commentId];
    deleteComment = mysql.format(deleteComment, deleteCommentValues);
    dataBaseConnection.query(deleteComment, function (error, result) {
      if (error) {
        return res.status(400).json({ error: "La suppression a échouée" });
      } else {
        return res
          .status(200)
          .json({ message: "Commentaire supprimé par un modérateur" });
      }
    });
  } else {
    //Suppression par le créateur du commentaire
    let commentCreator = "SELECT user_id FROM comments WHERE ID = ?";
    let commentCreatorValues = [commentId];
    commentCreator = mysql.format(commentCreator, commentCreatorValues);
    dataBaseConnection.query(commentCreator, function (error, result) {
      console.log(result[0].user_id);
      if (result[0].user_id !== req.auth.userId) {
        return res
          .status(401)
          .json({ error: "Ce n'est pas votre commentaire" });
      } else {
        let deleteComment = "DELETE FROM comments WHERE ID = ?";
        let deleteCommentValues = [commentId];
        deleteComment = mysql.format(deleteComment, deleteCommentValues);
        dataBaseConnection.query(deleteComment, function (error, result) {
          if (error) {
            return res.status(400).json({ error: "La suppression a échouée" });
          } else {
            return res
              .status(200)
              .json({ message: "Commentaire supprimé par son créateur !" });
          }
        });
      }
    });
  }
};
